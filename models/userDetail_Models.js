import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userDetailSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  accessToken: [
    {
      token: String,
    },
  ],
});

userDetailSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id },
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    this.accessToken = this.accessToken.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {}
  return "Hello";
};

const UserDetail = mongoose.model("USERDETAIL", userDetailSchema);
export default UserDetail;
