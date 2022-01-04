import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import google_OAuth_route from "../router/google_OAuth_route.js";
import facebook_Oauth_route from "../router/facebook_Oauth_route.js";
import github_Oauth_route from "../router/github_Oauth_Route.js";
import storageRoute from "../router/storageRoute.js";
import router from "../router/route.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
// app.use(cors({ credentials: true, origin: process.env.CLIENT_BASE_URL }));
app.use(cors({ credentials: true }));
// if we are requesting the server from client using {credentials:true} then we have to pass the object in 'cors()'
app.use(cookieParser());
app.unsubscribe(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import("../db/dbConn.js");
app.use(google_OAuth_route);
app.use(facebook_Oauth_route);
app.use(github_Oauth_route);
app.use(storageRoute);
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
