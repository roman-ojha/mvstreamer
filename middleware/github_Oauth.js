import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
