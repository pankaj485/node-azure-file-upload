import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve(__dirname, "../../uploads");

const validateUploadDir = () => {
  if (fs.existsSync(filePath)) {
    console.log("file exists");
  } else {
    fs.mkdirSync(filePath);
  }
};

export { filePath, validateUploadDir };
