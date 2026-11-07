import { NextRequest, NextResponse } from "next/server";
import { getStats } from "@/lib/analytics/tracker";

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || "kunal2026";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const providedKey = url.searchParams.get("key") || req.headers.get("x-admin-key");

  // Authentication check
  if (!providedKey || providedKey !== ADMIN_KEY) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Access restricted to Kunal. Provide secret key: /api/stats?key=YOUR_SECRET",
      },
      { status: 401 }
    );
  }

  const stats = getStats();
  const format = url.searchParams.get("format");

  // Return raw JSON if requested
  if (format === "json" || req.headers.get("accept")?.includes("application/json")) {
    return NextResponse.json(stats);
  }

  // Otherwise return a private, beautiful Liquid Glass dark dashboard
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kunal HQ — Private Visitor Telemetry</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      background: #030712;
      color: #f1f5f9;
      min-height: 100vh;
      padding: 2.5rem 1.5rem;
      display: flex;
      justify-content: center;
    }
    .container { max-width: 820px; width: 100%; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-family: monospace;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 4px 10px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .pulse { width: 6px; height: 6px; border-radius: 50%; background: #34d399; }
    h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
    p.lead { color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .card {
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 20px;
      backdrop-filter: blur(20px);
    }
    .card-label { font-size: 11px; font-family: monospace; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em; }
    .card-value { font-size: 36px; font-weight: 800; color: #fff; margin-top: 6px; }
    .card-sub { font-size: 11px; color: #38bdf8; font-family: monospace; margin-top: 4px; }
    .section-title { font-size: 14px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.12em; color: #38bdf8; margin: 24px 0 12px; }
    .list { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; font-family: monospace; }
    .list-item:last-child { border-bottom: none; }
    .list-item span:first-child { color: #e2e8f0; }
    .list-item span:last-child { color: #38bdf8; font-weight: 700; }
    .footer { margin-top: 32px; font-size: 11px; font-family: monospace; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge"><span class="pulse"></span> Private Telemetry · Kunal HQ</div>
    <h1>Visitor Analytics HUD</h1>
    <p class="lead">Private, hidden visitor counter for Kunal Chaudhari. Zero tracking scripts shown publicly on website.</p>

    <div class="grid">
      <div class="card">
        <div class="card-label">Total Page Views</div>
        <div class="card-value">${stats.totalPageviews.toLocaleString()}</div>
        <div class="card-sub">All-Time Impressions</div>
      </div>
      <div class="card">
        <div class="card-label">Unique Visitors</div>
        <div class="card-value">${stats.uniqueVisitors.toLocaleString()}</div>
        <div class="card-sub">Distinct Devices/Browsers</div>
      </div>
      <div class="card">
        <div class="card-label">Today's Visitors</div>
        <div class="card-value">${stats.today.uniqueVisitors.toLocaleString()}</div>
        <div class="card-sub">${stats.today.pageviews} views today</div>
      </div>
    </div>

    <div class="section-title">Top Visited Routes</div>
    <div class="list">
      ${
        stats.topPages.length > 0
          ? stats.topPages
              .map(
                (p) =>
                  `<div class="list-item"><span>${p.page}</span><span>${p.views} views</span></div>`
              )
              .join("")
          : '<div class="list-item"><span>No pages visited yet</span><span>0</span></div>'
      }
    </div>

    <div class="section-title">Traffic Referrers</div>
    <div class="list">
      ${
        stats.topReferrers.length > 0
          ? stats.topReferrers
              .map(
                (r) =>
                  `<div class="list-item"><span>${r.source}</span><span>${r.count} hits</span></div>`
              )
              .join("")
          : '<div class="list-item"><span>Direct / Bookmark</span><span>1</span></div>'
      }
    </div>

    <div class="footer">
      Last visitor ping: ${new Date(stats.lastHitAt).toLocaleString()} · Private Admin Key Active
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

