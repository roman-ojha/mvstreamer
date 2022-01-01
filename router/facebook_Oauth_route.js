import dotenv from "dotenv";
dotenv.config();
import express, { Router } from "express";
import("../middleware/Facebook_OAuth.js");
const router = express.Router();
import passport from "passport";
import session from "express-session";

router.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/oauth2/redirect/facebook",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/auth/fail",
    successRedirect: "/auth/facebook/auth/success",
  })
);

router.get("/auth/facebook/auth/success", (req, res) => {
  console.log(req.profile);
});

router.get("/auth/facebook/auth/fail", (req, res) => {
  console.log("Error");
  res.send("Error");
});

export default router;
