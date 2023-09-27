const admin = require("firebase-admin");

const serviceAccount = require("./brain-test-d86cd-firebase-adminsdk-yno8t-568d9f18fb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brain-test-d86cd-default-rtdb.firebaseio.com"
});

module.exports = admin;