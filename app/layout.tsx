import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "シンプルToDo",
  description: "Next.jsで作った日本語対応のシンプルなToDoアプリ"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
