import express from "express";
// import storage from "../db/FirebaseConn.js";
import storage from "../db/FirebaseConn02.js";
import authAdmin from "../middleware/authAdmin.js";
import compressImage from "../functions/compressImage.js";
import uploadImage from "../middleware/uploadImage.js";
import fs from "fs";
import uuid from "uuid-v4";
import MVDetail from "../models/Mv_Models.js";
import getRawBody from "raw-body";
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
    console.log(req.files);
    try {
      if (
        req.files.image === undefined ||
        req.files.media === undefined ||
        req.body.title === "" ||
        req.body.singerName === ""
      ) {
        return res
          .status(401)
          .json({ success: false, msg: "Please Fill the field properly" });
      }
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
      // here we are getting the type of file "audio/video"
      const uploadMediaInFirebase = await bucket.upload(
        `./db/Media/${req.files.media[0].filename}`,
        {
          destination:
            mediaType === "audio"
              ? `Audio/${req.files.media[0].filename}`
              : `Video/${req.files.media[0].filename}`,
          // if media type is audio then we are uploading it in "Audio/" if not "Video/"
          gzip: true,
          metadata: {
            contentType: mediaType === "audio" ? "audio/mpeg" : "video/mp4",
            firebaseStorageDownloadTokens: uuid(),
          },
        }
      );

      // deleting file from directory after upload
      fs.unlink(`./db/Media/${req.files.media[0].filename}`, (err) => {});
      const title = req.body.title;
      const singerName = req.body.singerName;
      const imgToken =
        uploadImgInFirebase[0].metadata.metadata.firebaseStorageDownloadTokens;
      const imgPath = `Images/${req.files.image[0].filename}`;
      const imgBucket = process.env.FIREBASE_STORAGE_BUCKET02;
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
      // saving songs info in mongodb
      const resSong = await newSong.save();
      return res
        .status(200)
        .json({ success: true, msg: "Song Upload Successfully" });
    } catch (err) {
      return res.status(500)({
        success: false,
        msg: "Sorry, Please try again later😥😥😥",
      });
    }
  }
);

// router.get("/Audio", async (req, res) => {
//   try {
//     const range = req.headers.range;
//     // we need a range header from the request because we can't tell client what part of the video we can't to send back
//     if (!range) {
//       res.status(400).send("Require Range header");
//     }

//     // const videoPath;
//     // const videoSize = fs.statSync("bigbuck.mp4").size;

//     // Parse range
//     // Example: "bytes=32324-"
//     // const CHUNK_SIZE = 10 ** 6; // 1MB
//     // const start = Number(range.replace(/\D/g, ""));
//     // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//     // const contentLength = end - start + 1;
//     // const headers = {
//     //   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     //   "Accept-Ranges": "bytes",
//     //   "Content-Length": contentLength,
//     //   "Content-Type": "video/mp4",
//     // };
//     // res.writeHead(206, headers);
//     // const videoStream=fs.createReadStream(videoPath,{start,end});
//     // videoStream.pipe(res);
//     res.send();
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/get/Audio", async (req, res) => {
//   try {
//     // getting audio file from the firebase
//     const file = bucket.file(`Audio/207317811a272d1c97ebc7854d47ba28.mp3`);
//     const buffer = await getRawBody(file.createReadStream());
//     // creating the audio buffer
//     res.setHeader("content-type", "audio/mpeg");
//     // setting the 'content-type' of that audio buffer;
//     // res.write(buffer, "binary");
//     res.send(buffer);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/get/Video", async (req, res) => {
  try {
    // const Audio = storage
    //   .bucket(process.env.FIREBASE_STORAGE_BUCKET02)
    //   .file("Audio/3e5cb31129e3f10d1e317b4436a2e4d0.mp3");
    // const AudioStream = Audio.createReadStream({ start: 1000, end: 2000 });
    // AudioStream.on("data", (data) => {
    //   res.write(data);
    // });
    const metadata = await storage
      .bucket()
      .file("Audio/e284081744838b545670e4c46ecada41.mp3")
      .getMetadata();
    const range = req.headers.range;
    // console.log(range);
    if (!range) {
      res.status(400).send("Requires Range headers");
    }
    // const videoPath = "./router/music.mp3";
    // const videoSize = fs.statSync(videoPath).size;
    const videoSize = metadata[0].size;
    const CHUNCK_SIZE = 10 ** 7; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    // console.log(start);
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
      .file("Audio/e284081744838b545670e4c46ecada41.mp3")
      .createReadStream({ start, end })
      .pipe(res);
    // fs.createReadStream(videoPath, { start, end }).pipe(res);
  } catch (err) {
    console.log(err);
  }
});

export default router;
