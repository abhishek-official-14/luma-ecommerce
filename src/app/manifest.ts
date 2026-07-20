import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luma Commerce",
    short_name: "Luma",
    description: "Remarkable finds for modern life.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfbf7",
    theme_color: "#1d2420",
    icons: [],
  };
}
