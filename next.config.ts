import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: path.resolve(__dirname),
  async headers() {
    return [
      {
        source: "/resume/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="Kunal_Chaudhari_Resume.pdf"',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/resume/Kunal_Chaudhari_Resume.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
