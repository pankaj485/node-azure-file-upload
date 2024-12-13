import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import fs from "node:fs";
require("dotenv").config();

const connectionString = process.env.BLOB_CONNECTION_STRING;
const containerName = process.env.BLOB_CONTAINER_NAME;
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

interface BlobItem {
  name: string;
  url: string;
}

const getBlobsList = async () => {
  const blobsList = containerClient.listBlobsFlat();
  const blobs: BlobItem[] = [];

  for await (const blob of blobsList) {
    blobs.push({
      name: blob.name,
      url: containerClient.getBlockBlobClient(blob.name).url,
    });
  }
  return blobs;
};

const uploadToBlobStorage = async (
  file: Express.Multer.File,
  blockBlobClient: BlockBlobClient
) => {
  try {
    const fileStream = fs.createReadStream(file.path);
    const uploadRes = await blockBlobClient.uploadStream(fileStream);
    return uploadRes.errorCode ? false : true;
  } catch (error) {
    console.log("Error uploading file to Azure Blob Storage:", error);
    return false;
  }
};

export { containerClient, getBlobsList, uploadToBlobStorage };
