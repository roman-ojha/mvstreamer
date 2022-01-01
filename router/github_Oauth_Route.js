import passport from "passport";
import express from "express";
const router = express.Router();
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_BASE_URL;
import session from "express-session";
import("../middleware/github_Oauth.js");

router.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/auth/github/login/success",
    failureRedirect: "/auth/github/login/fail",
  })
);

router.get("/auth/github/login/success", async (req, res) => {
  console.log(req);
  res.redirect(`${CLIENT_HOME_PAGE_URL}`);
});

router.get("/auth/github/login/fail", async (req, res) => {
  res.status(401).json({ error: "Something went wrong,try again letter" });
});

export default router;
