import multer, { StorageEngine } from "multer";
import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve(__dirname, "../../uploads");

const validateUploadDir = () => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
};

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const isValidFileFormat = (
  file: Express.Multer.File,
  format: string
): boolean => {
  const fileForamt = file.mimetype;
  return fileForamt === format;
};

const upload = multer({
  storage: storage,
}).single("imgfile");

export { isValidFileFormat, upload, validateUploadDir };
