import mongoose from "mongoose";

const MV_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  singerName: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  mediaPath: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const MVDetail = mongoose.model("MVDETAIL", MV_Schema);
export default MVDetail;
