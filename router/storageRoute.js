import express from "express";
import storage from "../db/FirebaseConn.js";
import authAdmin from "../middleware/authAdmin.js";
const router = express.Router();

router.post("/upload", async (req, res) => {
  const isAdminAuthenticated = await authAdmin(req.cookies._tk);
  //   authenticating admin
  if (isAdminAuthenticated.success === false) {
    return res
      .status(401)
      .json({ success: false, msg: isAdminAuthenticated.msg });
  }
  //   else admin is authenticated now admin can upload the media
  if (!req.body.title && !req.body.singerName && !req.body.file) {
    return res
      .status(400)
      .json({ success: false, msg: "Please Fill the filled properly" });
  }
  res.send("good");
});

export default router;
