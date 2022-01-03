import isJpg from "is-jpg";
import imagemin from "imagemin";
import sharp from "sharp";
import mozjpeg from "imagemin-mozjpeg";

const convertToJpg = async (input) => {
  if (isJpg(input)) {
    return input;
  }
  return sharp(input).jpeg().toBuffer();
};

const compressImage = async (filePath) => {
  await imagemin([filePath], {
    destination: "./db/build",
    plugins: [convertToJpg, mozjpeg({ quality: 70 })],
  });
};

export default compressImage;
