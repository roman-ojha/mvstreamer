import express from "express";
import storage from "../db/FirebaseConn.js";
import authAdmin from "../middleware/authAdmin.js";
import compressImage from "../functions/compressImage.js";
import uploadImage from "../middleware/uploadImage.js";
import fs from "fs";
import uuid from "uuid-v4";
import MVDetail from "../models/Mv_Models.js";
const router = express.Router();
const bucket = storage.bucket();

router.post(
  "/upload",
  authAdmin,
  uploadImage.fields([
    { name: "image", maxCount: 1 },
    { name: "media", maxCount: 1 },
  ]),
  async (req, res) => {
    // console.log(req.files);
    try {
      if (
        req.files.image === undefined ||
        req.files.media === undefined ||
        req.body.title === "" ||
        req.body.singerName === ""
      ) {
        return res
          .status(204)
          .json({ success: false, msg: "Please Fill the field properly" });
      }
      await compressImage(req.files.image[0].path);
      fs.unlink(`./db/Images/${req.files.image[0].filename}`, (err) => {});
      // // uploading song images
      const uploadImgInFirebase = await bucket.upload(
        `./db/build/${req.files.image[0].filename}`,
        {
          destination: `Images/${req.files.image[0].filename}`,
          gzip: true,
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuid(),
            },
            cacheControl: "public, max-age=31536000",
          },
        }
      );
      fs.unlink(`./db/build/${req.files.image[0].filename}`, (err) => {});
      // uploading Media
      // if uploading media is audio then we will upload it in different destination if uploading media is video then we will put it in different destination
      const mediaType = req.files.media[0].mimetype.split("/")[0];
      // here we are getting the type of file "audio/video"
      const uploadMediaInFirebase = await bucket.upload(
        `./db/Media/${req.files.media[0].filename}`,
        {
          destination:
            mediaType === "audio"
              ? `Audio/${req.files.media[0].filename}`
              : `Video/${req.files.media[0].filename}`,
          // if media type is audio then we are uploading it in "Audio/" if not "Video/"
          metadata: {
            contentType: req.files.media[0].mimetype,
            metadata: {
              firebaseStorageDownloadTokens: uuid(),
            },
            cacheControl: "public, max-age=31536000",
          },
        }
      );
      // deleting file from directory after upload
      fs.unlink(`./db/Media/${req.files.media[0].filename}`, (err) => {});
      const title = req.body.title;
      const artist = req.body.singerName;
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
        artist,
        imgUrl,
        mediaPath,
        mediaType,
      });
      // saving songs info in mongodb
      const resSong = await newSong.save();
      return res
        .status(201)
        .json({ success: true, msg: "Song Upload Successfully" });
    } catch (err) {
      return res.status(500)({
        success: false,
        msg: "Sorry, Please try again later😥😥😥",
      });
    }
  }
);

router.get("/get/Audio/:songID", async (req, res) => {
  try {
    const range = req.headers.range;
    const metadata = await storage
      .bucket()
      .file(`Audio/${req.params.songID}`)
      .getMetadata();
    // console.log(range);
    if (!range) {
      res.status(400).send("Requires Range headers");
    }
    const videoSize = Number(metadata[0].size);
    const CHUNCK_SIZE = 10 ** 5; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNCK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mpeg",
      // "Content-Type": "audio/mpeg",
    };
    // console.log(headers);
    res.writeHead(206, headers);
    bucket
      .file(`Audio/${req.params.songID}`)
      .createReadStream({ start, end })
      .pipe(res);
    // fs.createReadStream(videoPath, { start, end }).pipe(res);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/video/:videoID", async (req, res) => {
  try {
    const range = req.headers.range;
    const metadata = await storage
      .bucket()
      .file(`Video/${req.params.videoID}`)
      .getMetadata();
    if (!range) {
      res.status(400).send("Requires Range headers");
    }
    const videoSize = Number(metadata[0].size);
    const ChunkSize = 10 ** 7;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + ChunkSize, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    bucket
      .file(`Video/${req.params.videoID}`)
      .createReadStream({ start, end })
      .pipe(res);
  } catch (err) {
    console.log(err);
  }
});
export default router;
