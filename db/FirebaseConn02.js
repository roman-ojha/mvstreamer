import admin from "firebase-admin";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
  await readFile(
    new URL("./Firebase_serviceAccountKey02.json", import.meta.url)
  )
);

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET02,
};

admin.initializeApp(firebaseConfig);
var defaultStorage = admin.storage();
export default defaultStorage;
