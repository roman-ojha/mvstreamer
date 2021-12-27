import express from "express";
import userDetail from "../models/userDetail_Models.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// const generateToken = (email) => {
//   return jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
//     expiresIn: "30d",
//   });
// };

router.post("/signIn", async (req, res) => {
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
      const user = await newUser.save();
      // now so if user doesn't exist we have to create the token for the first time
      const token = await user.generateToken();
      return res.status(201).json({
        success: true,
        msg: "Creating user successfully",
        accessToken: token,
      });
    } else {
      // else user already exist then we have to create a token and save the token at the same time
      const token = await userDataRes.generateToken();
      return res
        .status(201)
        .json({ success: true, msg: "SignIn", accessToken: token });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server error!!!, please try again letter",
    });
  }
});

export default router;
