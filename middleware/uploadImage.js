import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  filename: async function (req, file, callback) {
    crypto.randomBytes(16, (err, buf) => {
      const filename = buf.toString("hex") + path.extname(file.originalname);
      callback(null, filename);
    });
  },
  destination: function (req, file, callback) {
    if (file.fieldname === "media") {
      callback(null, "./db/Media");
    } else if (file.fieldname === "image") {
      callback(null, "./db/Images");
    }
  },
});

export default multer({ storage });
