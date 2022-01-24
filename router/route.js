import express from "express";
import userAuth from "../middleware/userAuth.js";
import userDetail from "../models/userDetail_Models.js";
import MVDetail from "../models/Mv_Models.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getSongs = await MVDetail.find();
    const index = [];
    let randomNumber;
    const carouselItemLength = 4;
    let carouselItem = [];
    while (true) {
      // generating random value and creating carouselItem from that
      randomNumber = Math.floor(Math.random() * getSongs.length);
      if (!index.includes(randomNumber)) {
        index.push(randomNumber);
        carouselItem.push(getSongs[randomNumber]);
      }
      if (index.length > carouselItemLength - 1) {
        break;
      }
    }
    if (!getSongs) {
      return res.status(500).json({ success: false, msg: "Server Error" });
    }
    return res.status(200).json({ songs: getSongs, carouselItem });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
});

router.get("/auth", userAuth, async (req, res) => {
  res
    .status(200)
    .json({ success: true, user: req.user, msg: "Autorized Successfully" });
});

// right now this url is use for the flutter google signin
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
