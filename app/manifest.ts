import type { MetadataRoute } from "next";

const iconVersion = "20260705-simple-todo-app-icon";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "シンプルToDo",
    short_name: "ToDo",
    description: "Next.jsで作った日本語対応のシンプルなToDoアプリ",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1398f9",
    theme_color: "#1398f9",
    icons: [
      {
        src: `/icon1.png?v=${iconVersion}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: `/icon.png?v=${iconVersion}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: `/icon3.png?v=${iconVersion}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: `/icon2.png?v=${iconVersion}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
