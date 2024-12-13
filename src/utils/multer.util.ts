import multer, { StorageEngine } from "multer";
import { filePath } from "./blob.util";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export { storage };
