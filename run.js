const admin = require("firebase-admin");
const axios = require("axios");
const config = require("./config");

const serviceAccount = require(config.FIREBASE_CREDENTIAL_FILE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const query = db
  .collection("submissions")
  .orderBy("timestamp", "desc")
  .limit(1)
  .where("status", "==", "in_queue");
query.onSnapshot(snapshot => {
  axios.post(config.BASE_URL, {});
});
