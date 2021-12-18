import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import googleOauth2 from "passport-google-oauth2";
const GoogleStrategy = googleOauth2.Strategy;

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
      console.log(profile);
      return done(null, profile);
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
