import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kunal-portfolio-steel-rho.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/experience", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/mission-control", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/ask-kunal", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const now = new Date();

  return [
    ...routes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
