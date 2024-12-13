import { BlockBlobClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import {
  containerClient,
  getBlobsList,
  uploadToBlobStorage,
} from "../utils/azure.util";
import {
  isValidFileFormat,
  upload,
  validateUploadDir,
} from "../utils/multer.util";

class BlobController {
  uploadFile(req: Request, res: Response) {
    validateUploadDir();
    const fileFormat = "image/png";

    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: false,
          message: "File upload failed",
        });
      }

      if (!req.file) {
        return res.status(400).send({
          success: false,
          message: "File not uploaded",
        });
      }

      if (!isValidFileFormat(req.file, fileFormat)) {
        return res.status(400).send({
          success: false,
          message: `Invalid file format. Expected ${fileFormat}`,
        });
      }

      const blobName = Date.now() + "_" + req.file.originalname;
      const blockBlobClient: BlockBlobClient =
        containerClient.getBlockBlobClient(blobName);

      const UploadRes = await uploadToBlobStorage(req.file, blockBlobClient);

      return res.status(200).send({
        success: true,
        message: UploadRes
          ? "File uploaded successfully"
          : "File upload failed",
      });
    });
  }

  async getBlobs(req: Request, res: Response) {
    try {
      const blobs = await getBlobsList();

      return res.status(200).send({
        success: true,
        message: "Blobs retrieved successfully",
        totalFiles: blobs.length,
        data: blobs,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Error getting blobs",
      });
    }
  }
}

export { BlobController };
