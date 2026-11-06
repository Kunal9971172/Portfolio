import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

interface VisitorStore {
  totalPageviews: number;
  uniqueVisitors: number;
  uniqueHashes: Record<string, boolean>; // daily unique hashes: "YYYY-MM-DD:hash"
  todayDate: string;
  todayPageviews: number;
  todayUniqueVisitors: number;
  pageViews: Record<string, number>;
  referrers: Record<string, number>;
  lastHitAt: string;
}

const STATS_FILE = path.join(process.cwd(), "data", "visitor-stats.json");

// In-memory cache for fast read/writes
let memoryStore: VisitorStore = {
  totalPageviews: 0,
  uniqueVisitors: 0,
  uniqueHashes: {},
  todayDate: new Date().toISOString().slice(0, 10),
  todayPageviews: 0,
  todayUniqueVisitors: 0,
  pageViews: {},
  referrers: {},
  lastHitAt: new Date().toISOString(),
};

// Load existing stats on server start
try {
  if (fs.existsSync(STATS_FILE)) {
    const raw = fs.readFileSync(STATS_FILE, "utf-8");
    memoryStore = { ...memoryStore, ...JSON.parse(raw) };
  }
} catch {}

function saveStatsToFile() {
  try {
    const dir = path.dirname(STATS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Prune unique hashes older than 30 days to keep file compact
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    const prunedHashes: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(memoryStore.uniqueHashes)) {
      const datePart = k.split(":")[0];
      if (datePart >= thirtyDaysAgo) {
        prunedHashes[k] = v;
      }
    }
    memoryStore.uniqueHashes = prunedHashes;

    fs.writeFileSync(STATS_FILE, JSON.stringify(memoryStore, null, 2), "utf-8");
  } catch {}
}

export function recordVisit(req: {
  path: string;
  referrer: string;
  ip?: string;
  userAgent?: string;
}) {
  const today = new Date().toISOString().slice(0, 10);

  // Reset daily counters if day rolled over
  if (memoryStore.todayDate !== today) {
    memoryStore.todayDate = today;
    memoryStore.todayPageviews = 0;
    memoryStore.todayUniqueVisitors = 0;
  }

  // Increment total pageviews
  memoryStore.totalPageviews += 1;
  memoryStore.todayPageviews += 1;
  memoryStore.lastHitAt = new Date().toISOString();

  // Page breakdown
  const cleanPath = req.path || "/";
  memoryStore.pageViews[cleanPath] = (memoryStore.pageViews[cleanPath] || 0) + 1;

  // Referrer breakdown
  if (req.referrer && req.referrer !== "direct") {
    try {
      const host = new URL(req.referrer).hostname.replace(/^www\./, "");
      memoryStore.referrers[host] = (memoryStore.referrers[host] || 0) + 1;
    } catch {
      memoryStore.referrers[req.referrer] = (memoryStore.referrers[req.referrer] || 0) + 1;
    }
  } else {
    memoryStore.referrers["Direct / Bookmark"] =
      (memoryStore.referrers["Direct / Bookmark"] || 0) + 1;
  }

  // Unique visitor detection via anonymous daily hash (no IP/PII stored)
  const identifier = `${req.ip || "unknown"}-${req.userAgent || "unknown"}`;
  const anonHash = crypto.createHash("sha256").update(identifier).digest("hex").slice(0, 16);
  const dailyKey = `${today}:${anonHash}`;

  if (!memoryStore.uniqueHashes[dailyKey]) {
    memoryStore.uniqueHashes[dailyKey] = true;
    memoryStore.uniqueVisitors += 1;
    memoryStore.todayUniqueVisitors += 1;
  }

  saveStatsToFile();
}

export function getStats() {
  return {
    totalPageviews: memoryStore.totalPageviews,
    uniqueVisitors: memoryStore.uniqueVisitors,
    today: {
      date: memoryStore.todayDate,
      pageviews: memoryStore.todayPageviews,
      uniqueVisitors: memoryStore.todayUniqueVisitors,
    },
    topPages: Object.entries(memoryStore.pageViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([page, views]) => ({ page, views })),
    topReferrers: Object.entries(memoryStore.referrers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([source, count]) => ({ source, count })),
    lastHitAt: memoryStore.lastHitAt,
  };
}
