export type GameInfo = {
  id: string; // フィルター処理やkeyに使う一意なID (例: "red-green")
  displayName: string; // ボタンに表示するテキスト (もしテキストも併用する場合)
  imageSrc: string; // publicディレクトリからの画像のパス
  themeName?: string; // 対応するdaisyUIテーマ名
};

export const GAME_TITLE_DATA: GameInfo[] = [
  { id: "rgbp", displayName: "赤緑", imageSrc: "/images/game-logos/rgbp.png", themeName: "pokemon-red-green" },
  { id: "gsc", displayName: "金銀", imageSrc: "/images/game-logos/gsc.png", themeName: "pokemon-gold-silver" },
  { id: "rse", displayName: "RSE", imageSrc: "/images/game-logos/rse.png", themeName: "pokemon-rse" },
  { id: "dpt", displayName: "DPt", imageSrc: "/images/game-logos/dpt.png", themeName: "pokemon-dpt" },
  { id: "hgss", displayName: "HGSS", imageSrc: "/images/game-logos/hgss.png", themeName: "pokemon-hgss" },
  { id: "bw", displayName: "BW", imageSrc: "/images/game-logos/bw.png", themeName: "pokemon-bw" },
  { id: "bw2", displayName: "BW2", imageSrc: "/images/game-logos/bw2.png", themeName: "pokemon-bw2" },
  { id: "xy", displayName: "XY", imageSrc: "/images/game-logos/xy.png", themeName: "pokemon-xy" },
  { id: "sm", displayName: "SM", imageSrc: "/images/game-logos/sm.png", themeName: "pokemon-sm" },
  { id: "usum", displayName: "USUM", imageSrc: "/images/game-logos/usum.png", themeName: "pokemon-usum" },
  { id: "swsh", displayName: "剣盾", imageSrc: "/images/game-logos/swsh.png", themeName: "pokemon-sword-shield" },
  { id: "sv", displayName: "SV", imageSrc: "/images/game-logos/sv.png", themeName: "pokemon-sv" },
];

export const GAME_TITLES = [
  "赤緑",
  "金銀",
  "RSE",
  "DPt",
  "HGSS",
  "BW",
  "BW2",
  "XY",
  "SM",
  "USUM",
  "剣盾",
  "SV",
];
