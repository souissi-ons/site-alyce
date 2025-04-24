import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // allow all images from the domain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
