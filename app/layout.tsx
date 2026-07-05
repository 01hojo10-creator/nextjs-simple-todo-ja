import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "シンプルToDo",
  description: "Next.jsで作った日本語対応のシンプルなToDoアプリ",
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=20260705-simple-todo-app-icon",
        sizes: "48x48",
        type: "image/x-icon"
      },
      {
        url: "/icon.png?v=20260705-simple-todo-app-icon",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    shortcut: [
      {
        url: "/favicon.ico?v=20260705-simple-todo-app-icon",
        type: "image/x-icon"
      }
    ],
    apple: [
      {
        url: "/apple-icon.png?v=20260705-simple-todo-app-icon",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
