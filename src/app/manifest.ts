import type { MetadataRoute } from "next";
import { hospitalConfig } from "@/config/hospital";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: hospitalConfig.name,
    short_name: hospitalConfig.shortName,
    description: hospitalConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#fc6206",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
