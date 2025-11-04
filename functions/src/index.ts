import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addAdminRole = onCall(async (request) => {
  // V2 syntax: Auth data is on request.auth
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be logged in to call this function.");
  }

  // Check if the user making the call is an admin
  if (request.auth.token.admin !== true) {
    throw new HttpsError("permission-denied", "You must be an admin to perform this action.");
  }

  // V2 syntax: Input data is on request.data
  const email = request.data.email;
  if (!email || typeof email !== 'string') {
    throw new HttpsError("invalid-argument", "The function must be called with a valid 'email' string.");
  }
  
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    return { message: `Success! ${email} has been made an admin.` };
  } catch (error) {
    console.error("Error setting admin claim:", error);
    throw new HttpsError("internal", "Failed to set admin role. The user may not exist.");
  }
});