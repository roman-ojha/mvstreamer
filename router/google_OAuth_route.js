import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import session from "express-session";
import userDetail from "../models/userDetail_Models.js";
const router = express.Router();
import("../middleware/google_OAuth.js");
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_BASE_URL;

router.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/login/success",
    failureRedirect: "/auth/google/login/failed",
  })
);

router.get("/auth/google/login/success", async (req, res) => {
  try {
    const user = await userDetail.findOne({ email: req.user.email });
    console.log(user);
    const token = await user.generateToken();
    res.cookie("_tk", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    res.redirect(`${CLIENT_HOME_PAGE_URL}`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/auth/google/login/failed", async (req, res) => {
  res.status(401).json({ error: "Something went wrong,try again letter" });
});

export default router;
