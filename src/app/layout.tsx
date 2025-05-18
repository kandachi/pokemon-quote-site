import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

// ★ ローカルフォントのインスタンスを作成
const pokemonFont = localFont({
  src: [ // フォントファイルのパスを src 配列で指定
    {
      path: '../fonts/LINESeedJP_OTF_Bd.woff2', // src/fonts/ からの相対パス
      weight: 'bold', // このフォントファイルのウェイト
      style: 'normal', // このフォントファイルのスタイル
    },
    {
      path: '../fonts/LINESeedJP_OTF_Eb.woff2', // src/fonts/ からの相対パス
      weight: '900', // このフォントファイルのウェイト
      style: 'normal', // このフォントファイルのスタイル
    },
    {
      path: '../fonts/LINESeedJP_OTF_Rg.woff2', // src/fonts/ からの相対パス
      weight: 'normal', // このフォントファイルのウェイト
      style: 'normal', // このフォントファイルのスタイル
    },
    {
      path: '../fonts/LINESeedJP_OTF_Th.woff2', // src/fonts/ からの相対パス
      weight: '100', // このフォントファイルのウェイト
      style: 'normal', // このフォントファイルのスタイル
    },
  ],
  display: 'swap', // フォント読み込み中の挙動
  variable: '--font-pokemon', // CSS変数としてエクスポートする場合の名前
  // fallback: ['system-ui', 'arial'], // フォールバックフォント (オプション)
  // preload: true, // 事前読み込み (オプション、LCPに影響するフォントなら検討)
});

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
    <html lang="ja" data-theme="light" className={pokemonFont.variable}>
      <body className={pokemonFont.className}>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}