import passport from "passport";
import dotenv from "dotenv";
import googleOauth2 from "passport-google-oauth2";
import userDetail from "../models/userDetail_Models.js";
const GoogleStrategy = googleOauth2.Strategy;
dotenv.config({ path: "../config.env" });

let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const userExist = await userDetail.findOne({ email: profile.email });
        if (userExist) {
          return done(null, userExist);
        }
        const userData = new userDetail({
          id: profile.id,
          name: profile.displayName,
          email: profile.email,
          picture: profile.picture,
        });
        const createUser = await userData.save();
        return done(null, createUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

export default isLoggedIn;
