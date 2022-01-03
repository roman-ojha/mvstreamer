import express from "express";
import storage from "../db/FirebaseConn.js";
import authAdmin from "../middleware/authAdmin.js";
import compressImage from "../functions/compressImage.js";
import uploadImage from "../middleware/uploadImage.js";
const router = express.Router();

router.post("/upload", uploadImage.single("image"), async (req, res) => {
  const isAdminAuthenticated = await authAdmin(req.cookies._tk);
  //   authenticating admin
  // console.log(req.file);
  //   if (isAdminAuthenticated.success === false) {
  //     return res
  //       .status(401)
  //       .json({ success: false, msg: isAdminAuthenticated.msg });
  //   }
  //   //   else admin is authenticated now admin can upload the media
  //   if (!req.body.title && !req.body.singerName && !req.body.file) {
  //     return res
  //       .status(400)
  //       .json({ success: false, msg: "Please Fill the filled properly" });
  //   }
  //   await compressImage(req.file.path);
  res.send("good");
});

export default router;
