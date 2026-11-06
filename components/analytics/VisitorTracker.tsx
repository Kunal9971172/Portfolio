"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Silent, zero-UI visitor tracker.
 * Renders null (completely invisible to all public visitors).
 * Sends a background telemetry ping on page view to /api/stats/track.
 */
export default function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track when pathname changes
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    // Do not track API routes or development assets
    if (pathname.startsWith("/api") || pathname.startsWith("/_next")) return;

    try {
      const payload = JSON.stringify({
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
        timestamp: new Date().toISOString(),
      });

      // Use navigator.sendBeacon when available for non-blocking background telemetry
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/stats/track", payload);
      } else {
        fetch("/api/stats/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {}
  }, [pathname]);

  return null;
}
