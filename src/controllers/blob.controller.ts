import { Request, Response } from "express";
import multer from "multer";
import { validateUploadDir } from "../utils/blob.util";
import { storage } from "../utils/multer.util";

const upload = multer({
  storage: storage,
}).single("imgfile");

class BlobController {
  uploadFile(req: Request, res: Response) {
    validateUploadDir();

    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: false,
          message: "File upload failed",
        });
      }

      return res.status(200).send({
        success: true,
        message: "File uploaded successfully",
        file: req.file,
      });
    });
  }
}

export { BlobController };
