import admin from "firebase-admin";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
  await readFile(new URL("./Firebase_serviceAccountKey.json", import.meta.url))
);

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mvstreamer.appspot.com",
};

admin.initializeApp(firebaseConfig);
var defaultStorage = admin.storage();
export default defaultStorage;
