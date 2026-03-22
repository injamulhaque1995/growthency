import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
      { source: "/tools/:slug", destination: "/:slug", permanent: true },
      { source: "/services/:slug", destination: "/:slug", permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
};

export default nextConfig;
