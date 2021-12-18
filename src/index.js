import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import google_OAuth_route from "../router/google_OAuth_route.js";
dotenv.config({ path: "../config.env" });
const app = express();
app.use(cookieParser());
app.unsubscribe(express.json());
const PORT = process.env.PORT;

import("../db/dbConn.js");
app.use(google_OAuth_route);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
