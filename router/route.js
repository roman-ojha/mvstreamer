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
    if (!userDataRes) {
      // it means user is loging in for the first time so we have to create a account
      const newUser = new userDetail({
        id: id,
        name: name,
        email: email,
        picture: picture,
      });
      newUser
        .save()
        .then((user) => {
          return res
            .status(201)
            .json({ success: true, msg: "Creating user successfully" });
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      return res.status(201).json({ success: true, msg: "Authenticated" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server error!!!, please try again letter",
    });
  }
});

export default router;
