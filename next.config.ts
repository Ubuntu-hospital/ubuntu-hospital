import type { NextConfig } from "next";

const isStandalone =
  process.env.BUILD_STANDALONE === "true" || process.env.DOCKER_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isStandalone ? { output: "standalone" } : {}),
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
