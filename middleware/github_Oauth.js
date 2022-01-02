import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import UserDetail from "../models/userDetail_Models.js";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const userExist = await UserDetail.findOne({ github_id: profile.id });
        if (!userExist) {
          const newUser = new UserDetail({
            name: profile.displayName,
            github_id: profile.id,
            github_username: profile.username,
            picture: profile.photos[0].value,
          });
          const createUser = await newUser.save();
          return cb(null, createUser);
        } else {
          return cb(null, userExist);
        }
      } catch (err) {}
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
