import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/tools/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
