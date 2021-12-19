import mongoose from "mongoose";

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
});

const UserDetail = mongoose.model("USERDETAIL", userDetailSchema);
export default UserDetail;
