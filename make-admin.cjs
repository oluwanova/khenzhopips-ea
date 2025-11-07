// make-admin.js
const admin = require('firebase-admin');

// IMPORTANT: Download your service account key from your Firebase Project Settings
// and save it in this same folder as 'service-account-key.json'
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = "khenzhopips@gmail.com"; // <-- Ensure this is correct

async function setAdminClaim() {
  try {
    console.log(`Fetching user data for: ${email}...`);
    const user = await admin.auth().getUserByEmail(email);
    console.log(`Setting custom claim { admin: true } for user UID: ${user.uid}...`);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`\n✅ Success! User ${email} is now an admin.`);
    console.log("You can now proceed to the next steps.");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error("Please ensure the user exists in Firebase Auth and your service account key is correct.");
  }
}

setAdminClaim();