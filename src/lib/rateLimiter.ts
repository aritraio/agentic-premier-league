/**
 * Shared request throttle for all Gemini API calls.
 *
 * The free Gemini tier allows ~15 requests/minute. This module enforces a
 * minimum gap between outgoing requests so the app never bursts past the
 * limit, even when multiple features (generate, OCR, trends) fire close
 * together.
 */

const MIN_GAP_MS = 4_000; // 4 seconds → safe for 15 RPM

let lastRequestTimestamp = 0;
let pendingPromise: Promise<void> | null = null;

/**
 * Wait until it's safe to make the next Gemini request.
 *
 * Multiple callers can await this concurrently; they'll be serialised so
 * each request fires with at least `MIN_GAP_MS` between them.
 */
export async function waitForSlot(): Promise<void> {
  // Chain onto any already-pending wait so concurrent callers queue up.
  if (pendingPromise) {
    await pendingPromise;
  }

  const now = Date.now();
  const elapsed = now - lastRequestTimestamp;

  if (elapsed < MIN_GAP_MS) {
    const delay = MIN_GAP_MS - elapsed;
    pendingPromise = new Promise((resolve) => setTimeout(resolve, delay));
    await pendingPromise;
    pendingPromise = null;
  }

  lastRequestTimestamp = Date.now();
}

/** Returns `true` when the next request would be delayed. */
export function isThrottled(): boolean {
  return Date.now() - lastRequestTimestamp < MIN_GAP_MS;
}

/**
 * Milliseconds remaining before the next request can fire.
 * Returns 0 when the slot is available immediately.
 */
export function cooldownRemaining(): number {
  return Math.max(0, MIN_GAP_MS - (Date.now() - lastRequestTimestamp));
}
