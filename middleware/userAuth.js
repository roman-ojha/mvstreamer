import UserDetail from "../models/userDetail_Models.js";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies._tk;
    const varifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const userID = varifyToken._id;
    const findUser = await UserDetail.findOne({
      _id: userID,
      "accessToken.token": token,
    });
    if (!findUser) {
      return res.status(401).json({ success: false, msg: "User don't exist" });
    }
    req.user = findUser;
    req.token = token;
    // console.log(findUser);
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, msg: "Unauthorized: No token provided" });
  }
};

export default userAuth;
