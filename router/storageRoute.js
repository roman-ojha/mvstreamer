import express from "express";
import storage from "../db/FirebaseConn.js";
import authAdmin from "../middleware/authAdmin.js";
import compressImage from "../functions/compressImage.js";
import uploadImage from "../middleware/uploadImage.js";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import uuid from "uuid-v4";
const router = express.Router();
const bucket = storage.bucket();

router.post(
  "/upload",
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "media", maxCount: 1 },
  ]),
  async (req, res) => {
    // const isAdminAuthenticated = await authAdmin(req.cookies._tk);
    // authenticating admin
    // if (isAdminAuthenticated.success === false) {
    //   return res
    //     .status(401)
    //     .json({ success: false, msg: isAdminAuthenticated.msg });
    // }
    // //   else admin is authenticated now admin can upload the media
    // if (!req.body.title && !req.body.singerName && !req.body.file) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "Please Fill the filled properly" });
    // }
    await compressImage(req.files.image[0].path);
    fs.unlink(`./db/Images/${req.files.image[0].filename}`, (err) => {});
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
      cacheControl: "public, max-age=31536000",
    };
    const uploadImgInFirebase = await bucket.upload(
      `./db/build/${req.files.image[0].filename}`,
      {
        destination: `Images/${req.files.image[0].filename}`,
        gzip: true,
        metadata: metadata,
      }
    );
    fs.unlink(`./db/build/${req.files.image[0].filename}`, (err) => {});
    console.log(uploadImgInFirebase);
    res.send("good");
  }
);

export default router;
