export async function verifyRecaptcha(token: string | undefined | null): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) return true;
  if (!token) return false;
  try {
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );
    const data = await res.json();
    return data.success && (data.score ?? 0) >= 0.5;
  } catch {
    return false;
  }
}

const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(ip: string, limit = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const entry = buckets.get(ip);
  if (!entry || entry.reset < now) {
    buckets.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
