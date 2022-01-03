// This Middleware is use to authenticate admin user for the action which only admin can perform in this application

import jwt from "jsonwebtoken";
import UserDetail from "../models/userDetail_Models.js";

const authAdmin = async (token) => {
  try {
    const varifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const adminID = varifyToken._id;
    const isUser = await UserDetail.findOne({
      _id: adminID,
      "accessToken.token": token,
    });
    if (!isUser) {
      return { success: false, msg: "User doesn't exist" };
    } else if (isUser.gmail === process.env.ADMIN_GMAIL) {
      // here we are checking if the user gmail and the admin gmail to match then we are responsing it as the authorized admin
      return { success: true, msg: "Authenticated Admin" };
    }
    return { success: false, msg: "Unauthorized Admin" };
  } catch (err) {
    return { success: false, msg: "Unauthorized: No token provided" };
  }
};

export default authAdmin;
