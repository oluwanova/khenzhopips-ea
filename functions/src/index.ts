import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import * as crypto from "crypto";
import axios from "axios";
import { defineString } from "firebase-functions/params";

admin.initializeApp();

// --- Define environment variables securely using parameters ---
const nowPaymentsApiKey = defineString("NOWPAYMENTS_API_KEY");
const nowPaymentsIpnSecret = defineString("NOWPAYMENTS_IPN_SECRET");
const appUrl = defineString("APP_URL");

// --- Helper to check for admin privileges ---
const ensureIsAdmin = (context: any) => {
  if (context.auth?.token.admin !== true) {
    throw new HttpsError("permission-denied", "You must be an admin to perform this action.");
  }
};

// --- [FINAL] INTERNAL HELPER FOR CREATING LICENSES ---
const createLicenseForUser = async (uid: string, productId: string, productName: string, source: string, planType: 'monthly' | 'lifetime') => {
  const licenseKey = `KP-${productId.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const licensesRef = admin.firestore().collection('licenses');
  
  // Prevent duplicate LIFETIME purchases for the same product.
  if (planType === 'lifetime') {
    const existingQuery = await licensesRef.where('userId', '==', uid).where('productId', '==', productId).where('type', '==', 'lifetime').get();
    if (!existingQuery.empty) {
      logger.warn(`User ${uid} already has a lifetime license for ${productId}. Skipping creation.`);
      throw new HttpsError("already-exists", "This user already owns a lifetime license for this product.");
    }
  }

  const newLicense: any = {
    userId: uid,
    productId: productId,
    productName: productName,
    licenseKey: licenseKey,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    status: "active",
    maxSessions: 2,
    source: source,
    type: planType,
  };

  if (planType === 'monthly') {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 31); // License is valid for 31 days
    newLicense.expiresAt = admin.firestore.Timestamp.fromDate(expiry);
  }

  await licensesRef.add(newLicense);
  await admin.firestore().collection('users').doc(uid).set({ hasActiveLicense: true }, { merge: true });
  logger.log(`SUCCESS: ${planType} license created for user ${uid}, product ${productId} via ${source}`);
};


// --- [FINAL] PAYMENT AND WEBHOOK FUNCTIONS ---

export const createNowPaymentsInvoice = onCall({ cors: true }, async (request) => {
  if (!request.auth) { throw new HttpsError("unauthenticated", "You must be logged in."); }
  const { productId, productName, price, planType } = request.data;
  const uid = request.auth.uid;

  if (!productId || !productName || !price || !planType) { throw new HttpsError("invalid-argument", "Missing required information."); }
  if (planType !== 'lifetime' && planType !== 'monthly') { throw new HttpsError("invalid-argument", "Invalid plan type specified."); }

  const invoiceData = {
    price_amount: parseFloat(price),
    price_currency: 'usd',
    order_id: `${productId}|${uid}|${planType}`, // Pass all required info for the webhook
    order_description: `${productName} (${planType === 'lifetime' ? 'Lifetime' : 'Monthly'})`,
    success_url: `${appUrl.value()}/dashboard?purchase=success`,
    cancel_url: `${appUrl.value()}/products`,
  };

  try {
    const response = await axios.post('https://api.nowpayments.io/v1/invoice', invoiceData, { headers: { 'x-api-key': nowPaymentsApiKey.value() } });
    return { checkoutUrl: response.data.invoice_url };
  } catch (error: any) {
    logger.error("NOWPayments invoice creation failed:", error.response?.data || error.message);
    throw new HttpsError("internal", "Could not create a crypto invoice.");
  }
});
// In index.ts, replace the nowPaymentsWebhook function

export const nowPaymentsWebhook = onRequest(async (req, res) => {
    const providedSignature = req.headers['x-nowpayments-sig'] as string;
    try {
        const hmac = crypto.createHmac('sha512', nowPaymentsIpnSecret.value());
        hmac.update(JSON.stringify(req.body, Object.keys(req.body).sort()));
        const signature = hmac.digest('hex');

        if (signature !== providedSignature) {
            logger.error("Invalid NOWPayments signature.");
            // [FIX] Removed "return"
            res.status(401).send("Invalid signature.");
            return; // Use a plain return to exit the function
        }

        const data = req.body;
        if (data.payment_status === 'finished') {
            const [productId, uid, planType] = data.order_id.split('|');
            const productName = data.order_description.includes('Lifetime') 
                ? data.order_description.replace(' (Lifetime)', '')
                : data.order_description.replace(' (Monthly)', '');

            if (!uid || !productId || !productName || !planType) {
                logger.error("Incomplete metadata from NOWPayments webhook", { data });
                // [FIX] Removed "return"
                res.status(400).send("Missing required metadata.");
                return; // Use a plain return
            }
            await createLicenseForUser(uid, productId, productName, 'nowpayments', planType as ('lifetime' | 'monthly'));
        }
        
        // [FIX] Removed "return"
        res.status(200).send("OK");
        
    } catch (error) {
        logger.error("Error in NOWPayments webhook:", error);
        // [FIX] Removed "return"
        res.status(500).send("Internal Server Error");
    }
});


// --- [FINAL] EA FACING & ADMIN FUNCTIONS ---

export const adminMintLicense = onCall({ cors: true }, async (request) => {
    ensureIsAdmin(request);
    const { uid, productId, productName } = request.data;
    if (!uid || !productId || !productName) {
        throw new HttpsError("invalid-argument", "UID, Product ID, and Product Name are required.");
    }
    try {
        await createLicenseForUser(uid, productId, productName, 'admin', 'lifetime');
        return { success: true, message: `Lifetime license for ${productName} created for user ${uid}.` };
    } catch (error: any) {
        if (error instanceof HttpsError) throw error;
        logger.error("Admin minting failed:", error);
        throw new HttpsError("internal", "Could not mint the license.");
    }
});

export const verifyLicense = onCall({ cors: true }, async (request) => {
    const { licenseKey } = request.data;
    if (!licenseKey) { throw new HttpsError("invalid-argument", "A license key is required."); }

    const licensesRef = admin.firestore().collection('licenses');
    const snapshot = await licensesRef.where("licenseKey", "==", licenseKey).limit(1).get();
    if (snapshot.empty) { throw new HttpsError("not-found", "License key is invalid or not found."); }

    const licenseData = snapshot.docs[0].data();

    if (licenseData.status !== "active") { throw new HttpsError("permission-denied", `This license is inactive. Status: ${licenseData.status}`); }

    if (licenseData.type === 'monthly') {
        const now = admin.firestore.Timestamp.now();
        if (licenseData.expiresAt && licenseData.expiresAt < now) {
            await snapshot.docs[0].ref.update({ status: 'expired' });
            throw new HttpsError("permission-denied", "Your monthly subscription has expired.");
        }
    }

    return { success: true, message: "License is valid." };
});

export const registerEASession = onCall({ cors: true }, async (request) => {
  const { licenseKey, sessionId } = request.data;
  if (!licenseKey || !sessionId) { throw new HttpsError("invalid-argument", "Missing licenseKey or sessionId."); }

  const licensesRef = admin.firestore().collection("licenses");
  const snapshot = await licensesRef.where("licenseKey", "==", licenseKey).limit(1).get();

  if (snapshot.empty) { throw new HttpsError("not-found", "License key not found."); }
  
  const licenseDoc = snapshot.docs[0];
  const licenseData = licenseDoc.data();
  const uid = licenseData.userId; 
  const maxSessions = licenseData.maxSessions || 2;

  const sessionsRef = admin.firestore().collection('users').doc(uid).collection('sessions');
  const currentSessions = await sessionsRef.get();

  if (currentSessions.size >= maxSessions) {
      const sessions = currentSessions.docs.map(doc => doc.id);
      if (!sessions.includes(sessionId)) {
          throw new HttpsError("resource-exhausted", `Session limit of ${maxSessions} reached.`);
      }
  }

  await sessionsRef.doc(sessionId).set({ lastSeen: admin.firestore.FieldValue.serverTimestamp(), productId: licenseData.productId });
  return { success: true, message: "Session registered." };
});

export const addAdminRole = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const email = request.data.email;
  if (!email || typeof email !== 'string') { throw new HttpsError("invalid-argument", "Valid email required."); }
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    return { message: `Success! ${email} has been made an admin.` };
  } catch (error) { throw new HttpsError("internal", "Failed to set admin role."); }
});

export const getAllUsers = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  try {
    const userRecords = await admin.auth().listUsers(100);
    const users = userRecords.users.map((user) => ({
      uid: user.uid, email: user.email, creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime, isAdmin: user.customClaims?.admin === true, isDisabled: user.disabled,
    }));
    return { users };
  } catch (error) { throw new HttpsError("internal", "An error occurred while fetching users."); }
});

export const setUserDisabledStatus = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const { uid, disabled } = request.data;
  if (typeof uid !== 'string' || typeof disabled !== 'boolean') { throw new HttpsError("invalid-argument", "UID and disabled status are required."); }
  try {
    await admin.auth().updateUser(uid, { disabled });
    return { message: `User status updated.` };
  } catch (error) { throw new HttpsError("internal", "Failed to update user status."); }
});

export const deleteUser = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const { uid } = request.data;
  if (typeof uid !== 'string') { throw new HttpsError("invalid-argument", "User UID is required."); }
  try {
    await admin.auth().deleteUser(uid);
    await admin.firestore().collection('users').doc(uid).delete();
    const licensesRef = admin.firestore().collection('licenses');
    const snapshot = await licensesRef.where('userId', '==', uid).get();
    const batch = admin.firestore().batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    return { message: `User ${uid} and all associated licenses have been deleted.` };
  } catch (error) {
    logger.error(`Failed to delete user or licenses for user ${uid}`, error);
    throw new HttpsError("internal", "Failed to complete user deletion.");
  }
});

export const listUserSessions = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const { uid } = request.data;
  if (!uid || typeof uid !== 'string') { throw new HttpsError("invalid-argument", "A user UID is required."); }
  const sessionsRef = admin.firestore().collection('users').doc(uid).collection('sessions');
  const snapshot = await sessionsRef.get();
  const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return { sessions };
});

export const deleteUserSession = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const { uid, sessionId } = request.data;
  if (!uid || typeof uid !== 'string' || !sessionId || typeof sessionId !== 'string') {
    throw new HttpsError("invalid-argument", "User UID and Session ID are required.");
  }
  await admin.firestore().collection('users').doc(uid).collection('sessions').doc(sessionId).delete();
  return { message: "Session deleted." };
});