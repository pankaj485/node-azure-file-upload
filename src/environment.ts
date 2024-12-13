import { z } from "zod";

const envSchema = z.object({
  BLOB_CONTAINER_NAME: z.string(),
  BLOB_CONNECTION_STRING: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
