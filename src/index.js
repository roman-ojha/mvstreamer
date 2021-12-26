import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import google_OAuth_route from "../router/google_OAuth_route.js";
import router from "../router/route.js";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.unsubscribe(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import("../db/dbConn.js");
app.use(google_OAuth_route);
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
