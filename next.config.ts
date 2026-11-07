import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: path.resolve(__dirname),
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
