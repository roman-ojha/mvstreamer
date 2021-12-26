import express from "express";
import userDetail from "../models/userDetail_Models.js";
const router = express.Router();

router.post("/auth", async (req, res) => {
  const { name, email, picture, id } = req.body;
  try {
    if (req.body === undefined) {
      return res.status(404).json({ success: false, msg: "Client Error" });
    } else if (!name && !email) {
      return res.status(404).json({
        success: false,
        msg: "Name and email doesn't exist, Please try again letter",
      });
    }
    const userDataRes = await userDetail.findOne({
      email: email,
    });
    console.log(userDataRes);
  } catch (err) {}
  res.send("Hello");
});

export default router;
