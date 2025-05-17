import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ポケモンの名言集",
  description: "ポケモンシリーズの名言を集めたサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ★★★ data-theme 属性を削除するか、初期値を設定 ★★★
    // 初期値を設定する場合、page.tsxのcurrentThemeの初期値と合わせる
    <html lang="ja" data-theme="light">
      <body>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}