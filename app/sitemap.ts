import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/experience", "/mission-control", "/ask-kunal", "/contact"];
  return [
    ...routes.map((r) => ({ url: `${base}${r}` })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
