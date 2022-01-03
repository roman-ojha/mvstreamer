import express from "express";
import storage from "../db/FirebaseConn.js";
import authAdmin from "../middleware/authAdmin.js";
import compressImage from "../functions/compressImage.js";
import uploadImage from "../middleware/uploadImage.js";
import fs from "fs";
import path from "path";
import uuid from "uuid-v4";
import MVDetail from "../models/Mv_Models.js";
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
    // uploading song images
    const uploadImgInFirebase = await bucket.upload(
      `./db/build/${req.files.image[0].filename}`,
      {
        destination: `Images/${req.files.image[0].filename}`,
        gzip: true,
        metadata: metadata,
      }
    );
    fs.unlink(`./db/build/${req.files.image[0].filename}`, (err) => {});

    // uploading Media
    // if uploading media is audio then we will upload it in different destination if uploading media is video then we will put it in different destination
    const mediaType = req.files.media[0].mimetype.split("/")[0];
    const uploadMediaInFirebase = await bucket.upload(
      `./db/Media/${req.files.media[0].filename}`,
      {
        destination:
          mediaType === "audio"
            ? `Audio/${req.files.media[0].filename}`
            : `Video/${req.files.media[0].filename}`,
        // if media type is audio then we are uploading it in "Audio/" if not "Video/"
        gzip: true,
        metadata: metadata,
      }
    );
    fs.unlink(`./db/Media/${req.files.media[0].filename}`, (err) => {});
    const title = req.body.title;
    const singerName = req.body.singerName;
    const imgToken =
      uploadImgInFirebase[0].metadata.metadata.firebaseStorageDownloadTokens;
    const imgPath = `Images/${req.files.image[0].filename}`;
    const imgBucket = process.env.FIREBASE_STORAGE_BUCKET;
    const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${imgBucket}/o/${encodeURIComponent(
      imgPath
    )}?alt=media&token=${imgToken}`;
    const mediaPath =
      mediaType === "audio"
        ? `Audio/${req.files.media[0].filename}`
        : `Video/${req.files.media[0].filename}`;

    const newSong = new MVDetail({
      title,
      singerName,
      imgUrl,
      mediaPath,
    });
    const resSong = await newSong.save();
    console.log(resSong);
    res.send("good");
  }
);

export default router;
