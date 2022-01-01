//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

import passport from "passport";
import FacebookStrategy from "passport-facebook";

const clientID = process.env.FACEBOOK_APP_ID;
const clientSecret = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: `https://localhost:${process.env.PORT}/oauth2/redirect/facebook`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      //   db.get(
      //     "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
      //     ["https://www.facebook.com", profile.id],
      //     function (err, cred) {
      //       if (err) {
      //         return cb(err);
      //       }
      //       if (!cred) {
      //         // The Facebook account has not logged in to this app before.  Create a
      //         // new user record and link it to the Facebook account.
      //         db.run(
      //           "INSERT INTO users (name) VALUES (?)",
      //           [profile.displayName],
      //           function (err) {
      //             if (err) {
      //               return cb(err);
      //             }
      //             var id = this.lastID;
      //             db.run(
      //               "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
      //               [id, "https://www.facebook.com", profile.id],
      //               function (err) {
      //                 if (err) {
      //                   return cb(err);
      //                 }
      //                 var user = {
      //                   id: id.toString(),
      //                   name: profile.displayName,
      //                 };
      //                 return cb(null, user);
      //               }
      //             );
      //           }
      //         );
      //       } else {
      //         // The Facebook account has previously logged in to the app.  Get the
      //         // user record linked to the Facebook account and log the user in.
      //         db.get(
      //           "SELECT * FROM users WHERE id = ?",
      //           [cred.user_id],
      //           function (err, user) {
      //             if (err) {
      //               return cb(err);
      //             }
      //             if (!user) {
      //               return cb(null, false);
      //             }
      //             return cb(null, user);
      //           }
      //         );
      //       }
      //     }
      //   );
      return cb(null, profile);
    }
  )
);
