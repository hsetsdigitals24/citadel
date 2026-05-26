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

// SigV4 hard-caps presigned URLs at 7 days. For "permanent" image links,
// configure R2_PUBLIC_URL and use resolveImageUrl() below.
const MAX_SIGNED_TTL = 60 * 60 * 24 * 7;

export async function putObject(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
) {
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function getFileUrl(key: string) {
  return getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: MAX_SIGNED_TTL }
  );
}

export async function getObject(key: string) {
  return r2.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    })
  );
}


// Resolves a stored R2 object key into a renderable URL via our /api/image proxy.
export async function resolveImageUrl(
  key: string | null | undefined
): Promise<string | null> {
  if (!key) return null;
  if (/^https?:\/\//i.test(key)) return key;

  // Always route through our own /api/image proxy. Same-origin URL avoids
  // next/image's upstream fetch (which can hit DNS/IPv6 issues in dev or
  // require remotePatterns config), and works whether the bucket is public
  // or not. R2_PUBLIC_URL is kept in env for future direct-CDN serving.
  return `/api/image/${key.replace(/^\//, "")}`;
}
