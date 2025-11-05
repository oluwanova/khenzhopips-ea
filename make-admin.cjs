const admin = require('firebase-admin');
// Make sure the path is correct!
const serviceAccount = require('./service-account-key.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = 'a8UTvJ2T0yP6z4v0m9liUvwwHXp2'; // <-- PASTE YOUR UID

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Success! Admin claim has been set on the user.');
    process.exit(0);
  })
  .catch((error) => {
    console.log('Error setting admin claim:', error);
    process.exit(1);
  });