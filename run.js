const admin = require("firebase-admin");
const http = require("http");
const config = require("./config");

const serviceAccount = require(config.FIREBASE_CREDENTIAL_FILE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const options = {
  host: "localhost",
  port: config.PORT,
  path: "/",
  method: "POST",
};

const query = db
  .collection("submissions")
  .orderBy("timestamp", "desc")
  .limit(1)
  .where("status", "==", "in_queue");
query.onSnapshot((snapshot) => {
  const request = http.request(options);
  request.write("");
});
