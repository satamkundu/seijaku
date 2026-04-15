import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { env } from "../config.js";

type StoredUpload = {
  url: string;
  width?: number;
  height?: number;
};

function sanitizeFileName(name: string) {
  const baseName = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return baseName || "asset";
}

function resolveFileName(originalName: string) {
  const extension = path.extname(originalName) || ".bin";
  const stem = sanitizeFileName(path.basename(originalName, extension));
  return `${stem}-${crypto.randomUUID()}${extension.toLowerCase()}`;
}

function getPublicBaseUrl() {
  return env.PUBLIC_BASE_URL ?? `http://localhost:${env.PORT}`;
}

async function storeLocally(fileName: string, buffer: Buffer): Promise<StoredUpload> {
  const uploadDir = path.resolve(process.cwd(), env.LOCAL_UPLOAD_DIR);
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), buffer);
  return {
    url: `${getPublicBaseUrl()}/uploads/${fileName}`,
  } satisfies StoredUpload;
}

let s3Client: S3Client | null = null;

function getS3Client() {
  if (!env.S3_BUCKET || !env.S3_REGION || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
    throw new Error("S3 storage is configured without complete credentials");
  }

  if (!s3Client) {
    s3Client = new S3Client({
      region: env.S3_REGION,
      endpoint: env.S3_ENDPOINT,
      forcePathStyle: env.S3_FORCE_PATH_STYLE,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  return s3Client;
}

async function storeInS3(fileName: string, buffer: Buffer, contentType?: string): Promise<StoredUpload> {
  const client = getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    })
  );

  const publicBase =
    env.S3_PUBLIC_URL_BASE ??
    (env.S3_ENDPOINT
      ? `${env.S3_ENDPOINT.replace(/\/$/, "")}/${env.S3_BUCKET}`
      : `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com`);

  return {
    url: `${publicBase.replace(/\/$/, "")}/${fileName}`,
  } satisfies StoredUpload;
}

async function storeInVercelBlob(
  fileName: string,
  buffer: Buffer,
  contentType?: string
): Promise<StoredUpload> {
  if (!env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Vercel Blob storage is configured without BLOB_READ_WRITE_TOKEN");
  }

  // Dynamic import so the @vercel/blob module does not execute during
  // serverless cold start for functions that never touch Blob storage.
  const { put: blobPut } = await import("@vercel/blob");

  const result = await blobPut(fileName, buffer, {
    access: "public",
    contentType,
    token: env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
  });

  return { url: result.url } satisfies StoredUpload;
}

export async function storeUpload(args: {
  buffer: Buffer;
  contentType?: string;
  originalName: string;
}): Promise<StoredUpload> {
  const fileName = resolveFileName(args.originalName);

  if (env.STORAGE_DRIVER === "vercel-blob") {
    return storeInVercelBlob(fileName, args.buffer, args.contentType);
  }

  if (env.STORAGE_DRIVER === "s3") {
    return storeInS3(fileName, args.buffer, args.contentType);
  }

  return storeLocally(fileName, args.buffer);
}
