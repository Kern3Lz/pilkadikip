/**
 * Simple in-memory sliding window rate limiter
 * Ringan, tanpa Redis / dependencies eksternal (No over-engineering)
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const tracker = new Map<string, RateLimitRecord>();

// Passive cleanup pada interval minimal 5 menit agar aman di serverless Vercel
let lastCleanup = Date.now();
function cleanupExpired(now: number) {
  if (now - lastCleanup > 5 * 60 * 1000) {
    for (const [key, val] of tracker.entries()) {
      if (val.resetAt < now) {
        tracker.delete(key);
      }
    }
    lastCleanup = now;
  }
}

export function checkRateLimit(
  key: string,
  limit: number = 20,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  cleanupExpired(now);
  const record = tracker.get(key);

  if (!record || record.resetAt < now) {
    tracker.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}
