import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

// Helper to check for admin privileges
const ensureIsAdmin = (context: any) => {
  if (context.auth?.token.admin !== true) {
    throw new HttpsError("permission-denied", "You must be an admin to perform this action.");
  }
};

// --- USER MANAGEMENT FUNCTIONS ---

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
    return { message: `User ${uid} has been permanently deleted.` };
  } catch (error) { throw new HttpsError("internal", "Failed to delete user."); }
});

export const updateUserSubscription = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const { uid, newStatus } = request.data;
  if (typeof uid !== 'string' || typeof newStatus !== 'string') { throw new HttpsError("invalid-argument", "UID and new status are required."); }
  try {
    await admin.firestore().collection('users').doc(uid).update({ subscriptionStatus: newStatus });
    return { message: `User subscription is now '${newStatus}'.` };
  } catch (error) { throw new HttpsError("internal", "Failed to update subscription."); }
});


// --- PURCHASE & LICENSE FUNCTIONS ---

export const purchaseProduct = onCall({ cors: true }, async (request) => {
  if (!request.auth) { 
    throw new HttpsError("unauthenticated", "You must be logged in to purchase."); 
  }
  const uid = request.auth.uid;
  const { productId, productName } = request.data;

  if (!productId || !productName) { 
    throw new HttpsError("invalid-argument", "Product ID and name are required."); 
  }

  const licenseKey = "KP-" + productId.toUpperCase() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  try {
    await admin.firestore().collection('licenses').add({
      userId: uid,
      productId: productId,
      productName: productName,
      licenseKey: licenseKey,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "active",
    });

    await admin.firestore().collection('users').doc(uid).set({
      hasActiveLicense: true,
    }, { merge: true });

    return { success: true, message: `Successfully purchased ${productName}!` };
  } catch (error) {
    console.error("Error processing purchase:", error);
    throw new HttpsError("internal", "Could not process the purchase.");
  }
});

export const verifyLicense = onCall({ cors: true }, async (request) => {
  const licenseKey = request.data.licenseKey;
  if (!licenseKey) {
    throw new HttpsError("invalid-argument", "The function must be called with a licenseKey.");
  }

  const licensesRef = admin.firestore().collection("licenses");
  const snapshot = await licensesRef.where("licenseKey", "==", licenseKey).limit(1).get();

  if (snapshot.empty) {
    throw new HttpsError("not-found", "License key is invalid or not found.");
  }

  const licenseData = snapshot.docs[0].data();

  if (licenseData.status !== "active") {
    throw new HttpsError("permission-denied", "This license is not active.");
  }

  return { success: true, message: "License is valid." };
});


// --- SESSION FUNCTIONS ---

export const registerEASession = onCall({ cors: true }, async (request) => {
  const { licenseKey, sessionId } = request.data;
  if (!licenseKey || !sessionId) {
    throw new HttpsError("invalid-argument", "Missing licenseKey or sessionId.");
  }

  const licensesRef = admin.firestore().collection("licenses");
  const snapshot = await licensesRef.where("licenseKey", "==", licenseKey).limit(1).get();

  if (snapshot.empty) {
    throw new HttpsError("not-found", "License key not found.");
  }
  
  const licenseDoc = snapshot.docs[0];
  const licenseData = licenseDoc.data();
  const uid = licenseData.userId; 
  const maxSessions = licenseData.maxSessions || 2; // Default to 2 sessions if not set on the license

  // We need to reference the user's sessions, not a global one
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

export const listUserSessions = onCall({ cors: true }, async (request) => {
  ensureIsAdmin(request);
  const { uid } = request.data;
  if (!uid || typeof uid !== 'string') { throw new HttpsError("invalid-argument", "A user UID is required."); }
  // Corrected path to user-specific sessions
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
  // Corrected path to user-specific sessions
  await admin.firestore().collection('users').doc(uid).collection('sessions').doc(sessionId).delete();
  return { message: "Session deleted." };
});