import express from "express";
import storage from "../db/FirebaseConn.js";
import authAdmin from "../middleware/authAdmin.js";
const router = express.Router();

router.post("/upload", (req, res) => {
  authAdmin(req.cookies._tk);
  res.send("good");
});

export default router;
