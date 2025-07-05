// 個々のゲームバージョンの情報
export type GameVersionInfo = {
  id: string; // 例: "red", "green", "gold", "silver", "platinum", "heartgold"
  displayName: string; // 例: "赤", "緑", "金", "銀", "プラチナ", "ハートゴールド"
  logoSrc: string; // 例: "/images/game-logos/red.png"
};

// ゲームシリーズの情報
export type GameSeriesInfo = {
  seriesId: string; // 例: "rg", "gs", "dp", "pt", "hgss" (フィルタリングや比較に使うキー)
  seriesName: string; // 例: "赤・緑", "金・銀", "ダイヤモンド・パール" (ボタン表示用)
  versions: GameVersionInfo[]; // このシリーズに含まれるバージョンの配列
  themeName?: string; // シリーズ全体で適用するテーマ名
  // フィルターボタンに表示する代表ロゴ (複数の場合、最初のものなど)
  filterButtonLogoSrc?: string; // オプション: フィルターボタンが1つの画像の場合
};

// DynamoDBのgameカラムに登録されている可能性のあるキーと、それに対応するシリーズIDのマッピング
// これにより、"Pt/HGSS"のような複合キーや、"Em"のような単独キーを解釈しやすくする
export const GAME_ID_TO_SERIES_ID_MAP: Record<string, string> = {
  "赤緑": "rg",
  "金銀": "gs",
  "RSE": "rse", // Ruby, Sapphire, Emerald
  "Em": "rse",   // Emerald は RSEシリーズの一部として扱う
  "FRLG": "frlg", // FireRed, LeafGreen
  "DPt": "dppt",  // Diamond, Pearl, Platinum (DPとPtをまとめたシリーズID)
  "Pt": "dppt",   // Platinum は DPtシリーズの一部
  "HGSS": "hgss", // HeartGold, SoulSilver
  "BW": "bw",
  "BW2": "bw2",
  "XY": "xy",
  "SM": "sm",
  "USUM": "usum",
  "LPLE": "lple", // Let's Go Pikachu, Let's Go Eevee
  "剣盾": "swsh",
  "LA": "la",
  "SV": "sv",
};

export const ALL_GAME_SERIES_DATA: GameSeriesInfo[] = [
  {
    seriesId: "rg",
    seriesName: "赤・緑", // 青とピカチュウも考慮
    versions: [
      { id: "red", displayName: "赤", logoSrc: "/images/game-logos/red.png" },
      { id: "green", displayName: "緑", logoSrc: "/images/game-logos/green.png" },
      //{ id: "blue", displayName: "青", logoSrc: "/images/game-logos/blue.png" }, // 必要なら追加
      //{ id: "yellow", displayName: "ピカチュウ", logoSrc: "/images/game-logos/yellow.png" }, // 必要なら追加
    ],
    themeName: "pokemon-red-green", // このシリーズの代表テーマ
  },
  {
    seriesId: "gs",
    seriesName: "金・銀・クリスタル",
    versions: [
      { id: "gold", displayName: "金", logoSrc: "/images/game-logos/gold.png" },
      { id: "silver", displayName: "銀", logoSrc: "/images/game-logos/silver.png" },
      { id: "crystal", displayName: "クリスタル", logoSrc: "/images/game-logos/crystal.png" }, // 必要なら追加
    ],
    themeName: "pokemon-gold-silver",
  },
  {
    seriesId: "rse",
    seriesName: "ルビー・サファイア・エメラルド",
    versions: [
      { id: "ruby", displayName: "ルビー", logoSrc: "/images/game-logos/ruby.png" },
      { id: "sapphire", displayName: "サファイア", logoSrc: "/images/game-logos/sapphire.png" },
      { id: "emerald", displayName: "Em", logoSrc: "/images/game-logos/emerald.png" },
    ],
    themeName: "pokemon-rse",
    filterButtonLogoSrc: "/images/game-logos/rse_filter_button.png",
  },
  {
    seriesId: "frlg",
    seriesName: "ファイアレッド・リーフグリーン",
    versions: [
      { id: "firered", displayName: "ファイアレッド", logoSrc: "/images/game-logos/firered.png" },
      { id: "leafgreen", displayName: "リーフグリーン", logoSrc: "/images/game-logos/leafgreen.png" },
    ],
    themeName: "pokemon-red-green", // 赤緑テーマを流用 or 専用テーマ
    filterButtonLogoSrc: "/images/game-logos/frlg_filter_button.png",
  },
  {
    seriesId: "dppt",
    seriesName: "ダイヤモンド・パール・プラチナ",
    versions: [
      { id: "diamond", displayName: "ダイヤモンド", logoSrc: "/images/game-logos/diamond.png" },
      { id: "pearl", displayName: "パール", logoSrc: "/images/game-logos/pearl.png" },
      { id: "platinum", displayName: "Pt", logoSrc: "/images/game-logos/platinum.png" },
    ],
    themeName: "pokemon-dpt",
    filterButtonLogoSrc: "/images/game-logos/dppt_filter_button.png",
  },
  {
    seriesId: "hgss",
    seriesName: "ハートゴールド・ソウルシルバー",
    versions: [
      { id: "heartgold", displayName: "ハートゴールド", logoSrc: "/images/game-logos/heartgold.png" },
      { id: "soulsilver", displayName: "ソウルシルバー", logoSrc: "/images/game-logos/soulsilver.png" },
    ],
    themeName: "pokemon-hgss",
    filterButtonLogoSrc: "/images/game-logos/hgss_filter_button.png",
  },
  {
    seriesId: "bw",
    seriesName: "ブラック・ホワイト",
    versions: [
      { id: "black", displayName: "ブラック", logoSrc: "/images/game-logos/black.png" },
      { id: "white", displayName: "ホワイト", logoSrc: "/images/game-logos/white.png" },
    ],
    themeName: "pokemon-bw",
    filterButtonLogoSrc: "/images/game-logos/bw_filter_button.png",
  },
  {
    seriesId: "bw2",
    seriesName: "ブラック2・ホワイト2",
    versions: [
      { id: "black2", displayName: "ブラック2", logoSrc: "/images/game-logos/black2.png" },
      { id: "white2", displayName: "ホワイト2", logoSrc: "/images/game-logos/white2.png" },
    ],
    themeName: "pokemon-bw2",
    filterButtonLogoSrc: "/images/game-logos/bw2_filter_button.png",
  },
  {
    seriesId: "xy",
    seriesName: "X・Y",
    versions: [
      { id: "x", displayName: "X", logoSrc: "/images/game-logos/x.png" },
      { id: "y", displayName: "Y", logoSrc: "/images/game-logos/y.png" },
    ],
    themeName: "pokemon-xy",
    filterButtonLogoSrc: "/images/game-logos/xy_filter_button.png",
  },
  {
    seriesId: "sm",
    seriesName: "サン・ムーン",
    versions: [
      { id: "sun", displayName: "サン", logoSrc: "/images/game-logos/sun.png" },
      { id: "moon", displayName: "ムーン", logoSrc: "/images/game-logos/moon.png" },
    ],
    themeName: "pokemon-sm",
    filterButtonLogoSrc: "/images/game-logos/sm_filter_button.png",
  },
  {
    seriesId: "usum",
    seriesName: "ウルトラサン・ウルトラムーン",
    versions: [
      { id: "ultrasun", displayName: "ウルトラサン", logoSrc: "/images/game-logos/ultrasun.png" },
      { id: "ultramoon", displayName: "ウルトラムーン", logoSrc: "/images/game-logos/ultramoon.png" },
    ],
    themeName: "pokemon-usum",
    filterButtonLogoSrc: "/images/game-logos/usum_filter_button.png",
  },
  {
    seriesId: "swsh",
    seriesName: "ソード・シールド",
    versions: [
      { id: "sword", displayName: "ソード", logoSrc: "/images/game-logos/sword.png" },
      { id: "shield", displayName: "シールド", logoSrc: "/images/game-logos/shield.png" },
    ],
    themeName: "pokemon-sword-shield",
    filterButtonLogoSrc: "/images/game-logos/swsh_filter_button.png",
  },
  {
    seriesId: "la",
    seriesName: "LEGENDS アルセウス",
    versions: [
      { id: "la", displayName: "LEGENDS アルセウス", logoSrc: "/images/game-logos/la.png" },
    ],
    themeName: "pokemon-la",
    filterButtonLogoSrc: "/images/game-logos/la_filter_button.png",
  },
  {
    seriesId: "sv",
    seriesName: "スカーレット・バイオレット",
    versions: [
      { id: "scarlet", displayName: "スカーレット", logoSrc: "/images/game-logos/scarlet.png" },
      { id: "violet", displayName: "バイオレット", logoSrc: "/images/game-logos/violet.png" },
    ],
    themeName: "pokemon-sv",
    filterButtonLogoSrc: "/images/game-logos/sv_filter_button.png",
  },
];