import express, { Router } from "express";
import { sayHello } from "../../controllers/app.controller";
import { BlobController } from "../../controllers/blob.controller";

const router: Router = express.Router();

const blobController = new BlobController();

router.get("/", sayHello);
router.post("/file-upload", blobController.uploadFile);
router.get("/list-files", blobController.getBlobs);

export { router as apiV1AppRoute };
