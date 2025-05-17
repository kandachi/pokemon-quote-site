/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}", // App Router を使用しているため
  ],
  theme: {
    extend: {
      fontFamily: { // お好みでフォント設定
        sans: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        "pokemon-red-green": {
          "primary": "#FF3B30",       // 明るめの赤 (Redのイメージ)
          "secondary": "#4CD964",     // 明るめの緑 (Greenのイメージ)
          "accent": "#FFCC00",        // 黄色 (ピカチュウ、電気)
          "neutral": "#FF3B30",       // グレー (UI要素の区切りなど)
          "base-100": "#C0BC8F",       // 明るいオフホワイト (清潔感)
          "base-200": "#C0BC8F",
          "base-300": "#D1D1D6",
          "base-content": "#000000",   // 濃いチャコールグレー (文字)
          "info": "#007AFF",
          "success": "#34C759",
          "warning": "#FF9500",
          "error": "#FF3B30",
        },

        "pokemon-gold-silver": {
          "primary": "#FFB800",       // ゴールド (ややオレンジ寄りの金)
          "secondary": "#B0B8BF",     // シルバー (落ち着いた銀色)
          "accent": "#E63946",        // 赤系 (ホウオウ、ルギアのアクセント)
          "neutral": "#5A5A5E",
          "base-100": "#B0B8BF",       // クリームがかった白 (和紙のような)
          "base-200": "#E7CE84",
          "base-300": "#EBE0B8",
          "base-content": "#2F2F2F",   // 濃い茶色に近いグレー
          "info": "#5AC8FA",
          "success": "#4CAF50",
          "warning": "#FFC107",
          "error": "#F44336",
        },

        "pokemon-rse": {
          "primary": "#E62F2F",       // ルビーレッド
          "secondary": "#2F80E6",     // サファイアブルー
          "accent": "#32CD32",        // エメラルドグリーン (アクセント)
          "neutral": "#6D6D72",
          "base-100": "#4498BE",       // 淡い水色/白 (海のイメージ)
          "base-200": "#C73132",
          "base-300": "#C2D0D9",
          "base-content": "#1A2B3C",   // 濃いネイビー
          "info": "#00A2FF",
          "success": "#28A745",
          "warning": "#FFEB3B",
          "error": "#DC3545",
        },

        "pokemon-dpt": {
          "primary": "#5AC8FA",       // ダイアモンドの輝き (水色)
          "secondary": "#FF80AB",     // パールの輝き (ピンク)
          "accent": "#777777",        // プラチナグレー (アクセント)
          "neutral": "#4B5563",
          "base-100": "#D5D6F3",       // 非常に明るいグレー/白 (雪国のイメージ)
          "base-200": "#D1C1D0",
          "base-300": "#E5E7EB",
          "base-content": "#000000",   // 濃いスレートグレー
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },

        "pokemon-hgss": {
          "primary": "#FFB800",       // ゴールド
          "secondary": "#B0B8BF",     // シルバー
          "accent": "#E53935",        // ハートの赤
          // "accent2": "#1E88E5",    // 魂の青 (アクセントを2つ使いたい場合、daisyUIの変数で対応)
          "neutral": "#B0B8BF",
          "base-100": "#E4C65E",       // 金銀より少し温かみのある背景
          "base-200": "#ABB9CA",
          "base-300": "#EBE5CC",
          "base-content": "#3A3A3A",
          // ... info, success etc.
        },

        "pokemon-bw": {
          "primary": "#FFFFFF",       // ホワイト (これをプライマリにするか、セカンダリにするかで印象が変わる)
          "secondary": "#000000",     // ブラック
          "accent": "#7C7C7C",        // グレー (中間色)
          "neutral": "#2C2C2C",       // ダークグレー
          //"base-100": "#EAEAEA",       // 明るいグレーの背景 (白を際立たせる)
          "base-100": "#E7E6E5", // 黒背景で白文字もアリ
          "base-200": "#1A1A1A",
          "base-content": "#3A3A3A",  // ほぼ黒の文字
          // ... info, success etc.
        },

        "pokemon-bw2": {
          "primary": "#0A74DA",       // ブラックキュレムの青
          "secondary": "#FF4500",     // ホワイトキュレムの白/氷のイメージ
          "accent": "#FFD700",        // 雷の黄色 (ゼクロム) or #FF4500 (炎のオレンジ/赤 レシラム)
          "neutral": "#333333",
          "base-100": "#FFFFFF",       // ダークな背景
          "base-200": "#212121",
          "base-content": "#3A3A3A",   // 明るいグレーの文字
          // ... info, success etc.
        },

        "pokemon-xy": {
          "primary": "#0075BE",       // ゼルネアスの青
          "secondary": "#E4002B",     // イベルタルの赤
          "accent": "#FFCB05",        // 黄色 (共通のアクセント)
          "neutral": "#555555",
          "base-100": "#0075BE",       // 明るく洗練された背景
          "base-200": "#E4002B",
          "base-content": "#222222",
          // ... info, success etc.
        },

        "pokemon-sm": {
          "primary": "#FF9800",       // 太陽のオレンジ
          "secondary": "#3F51B5",     // 月の紺
          "accent": "#00BCD4",        // 水色 (海、アローラの自然)
          "neutral": "#616161",
          "base-100": "#FF9800",       // 暖色系の明るい背景
          "base-200": "#3F51B5",
          "base-content": "#3E2723",   // 濃い茶色
          // ... info, success etc.
        },

        "pokemon-usum": {
          "primary": "#FFA726", // SMの太陽より少し明るいオレンジ
          "secondary": "#5C6BC0", // SMの月より少し明るい紺
          "accent": "#AB47BC", // 紫 (ウルトラスペース)
          "neutral": "#263238", // ネクロズマの黒っぽい色
          "base-100": "#5C6BC0", // クールな明るいグレー
          "base-200": "#FFA726",
          "base-content": "#102A43",
          // ... info, success etc.
        },

        "pokemon-sword-shield": {
          "primary": "#00A1E4",       // ザシアンのシアン
          "secondary": "#D80032",     // ザマゼンタのマゼンタ
          "accent": "#F1C40F",        // ゴールド (王冠など)
          "neutral": "#4A5568",       // ストーングレー
          "base-100": "#D80032",       // 清潔感のあるオフホワイト
          "base-200": "#00A1E4",
          "base-content": "#2D3748",
          // ... info, success etc.
        },

        "pokemon-sv": {
          "primary": "#E64A19", // スカーレット (鮮やかな朱色)
          "secondary": "#7B1FA2", // バイオレット (深い紫色)
          "accent": "#FFCA28", // オレンジがかった黄色 (太陽、果物)
          "neutral": "#6D4C41", // アースカラー (茶色)
          "base-100": "#7B1FA2", // 明るいクリームイエロー (スペインの陽光)
          "base-200": "#E64A19",
          "base-content": "#4E342E", // 濃い焦げ茶
          // ... info, success etc.
        },
      },
    ], // 使用するテーマ
    styled: true,
    base: true,
    utils: true,
  },
};