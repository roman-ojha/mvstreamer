import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({ path: "../config.env" });
const app = express();
app.use(cookieParser());
app.unsubscribe(express.json());
const PORT = process.env.PORT;

import("../db/dbConn.js");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
