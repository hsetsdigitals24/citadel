import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

export async function getUploadUrl(key: string, contentType: string) {
  return getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 300 }
  );
}

export async function getFileUrl(key: string) {
  return getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 3600 }
  );
}

// Resolves a stored R2 object key into a renderable URL.
// - If the value already looks like a full URL, return as-is.
// - If R2_PUBLIC_URL is set (public bucket), prefer that — no signing round-trip.
// - Otherwise generate a short-lived signed GET URL.
// Returns null when R2 isn't configured at all.
export async function resolveImageUrl(
  key: string | null | undefined
): Promise<string | null> {
  if (!key) return null;
  if (/^https?:\/\//i.test(key)) return key;

  const publicBase = process.env.R2_PUBLIC_URL;
  if (publicBase) {
    return `${publicBase.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
  }

  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID) return null;

  try {
    return await getFileUrl(key);
  } catch {
    return null;
  }
}
