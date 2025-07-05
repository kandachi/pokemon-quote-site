"use client"; // ReactDOM.createPortal を使うためクライアントコンポーネント

import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import type { Quote } from '@/types';
import Image from 'next/image';
import { ALL_GAME_SERIES_DATA, GAME_ID_TO_SERIES_ID_MAP, type GameVersionInfo } from '@/constants';

type QuoteModalProps = {
  quote: Quote;
  onClose: () => void;
};

// モーダルコンポーネント
export default function QuoteModal({ quote, onClose }: QuoteModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRootRef = useRef<Element | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  const images = quote.imageUrls || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };


  useEffect(() => {
    setIsBrowser(true);
    modalRootRef.current = document.getElementById('modal-root');
  }, []);

  if (!isBrowser || !modalRootRef.current || !quote) { // quote が null の場合も考慮
    return null;
  }

  // 表示するゲームロゴの情報を取得
  const getRelevantGameVersions = (gameString: string): GameVersionInfo[] => {
    const gameIdStringsFromQuote = gameString.split('/').map(s => s.trim()); // "Pt/HGSS" -> ["Pt", "HGSS"]
    const relevantVersionsSet = new Set<GameVersionInfo>(); // 重複を避けるためにSetを使用

    gameIdStringsFromQuote.forEach(singleGameIdOrSeriesName => {
      // まず、GAME_ID_TO_SERIES_ID_MAP でシリーズIDを探す
      const mappedSeriesId = GAME_ID_TO_SERIES_ID_MAP[singleGameIdOrSeriesName];

      if (mappedSeriesId) {
        // マップで見つかった場合 (例: "Pt" -> "dppt", "Em" -> "rse")
        const seriesInfo = ALL_GAME_SERIES_DATA.find(s => s.seriesId === mappedSeriesId);
        if (seriesInfo) {
          // singleGameIdOrSeriesName が具体的なバージョンID (例: "Pt", "Em") か、
          // それともマップのキー自体がシリーズ名 (例: "RSE" や "DPt" が game カラムに入っていた場合) かを判断
          // ここでは、マップのキーが具体的なバージョンIDを示すことを期待する
          // (例: GAME_ID_TO_SERIES_ID_MAP のキーが "platinum", "emerald" などになっているとより良い)

          // より確実なのは、singleGameIdOrSeriesName がシリーズ内の特定のバージョンIDと一致するかどうか
          const specificVersion = seriesInfo.versions.find(v => v.id.toLowerCase() === singleGameIdOrSeriesName.toLowerCase() || v.displayName === singleGameIdOrSeriesName);

          if (specificVersion) {
            // 特定のバージョンが見つかればそれだけを追加
            relevantVersionsSet.add(specificVersion);
          } else {
            // マップで見つかったが、具体的なバージョンIDではなかった場合 (例: "RSE" が game カラムに入っていた)
            // そのシリーズの全バージョンを追加 (現在の動作に近い)
            seriesInfo.versions.forEach(v => relevantVersionsSet.add(v));
          }
        }
      } else {
        // マップで見つからなかった場合、singleGameIdOrSeriesName が直接シリーズIDまたはシリーズ名かもしれない
        const seriesInfo = ALL_GAME_SERIES_DATA.find(
          s => s.seriesId === singleGameIdOrSeriesName || s.seriesName === singleGameIdOrSeriesName
        );
        if (seriesInfo) {
          // シリーズが見つかれば、そのシリーズの全バージョンを追加
          seriesInfo.versions.forEach(v => relevantVersionsSet.add(v));
        } else {
          console.warn(`該当するゲーム情報が見つかりませんでした: ${singleGameIdOrSeriesName}`);
        }
      }
    });

    return Array.from(relevantVersionsSet); // Setから配列に変換して返す
  };

  const relevantGameLogos = getRelevantGameVersions(quote.game);

  if (!isBrowser || !modalRootRef.current || !quote) {
    return null;
  }


  return ReactDOM.createPortal(
    <div className="modal modal-open">
       {/* ★★★ modal-box に flex flex-col を追加 ★★★ */}
      <div className="modal-box p-0 relative w-11/12 max-w-4xl flex flex-col max-h-[90vh]"> {/* 高さを少し調整 */}
        {/* --- モーダルヘッダー --- */}
        <div className="modal-header px-4 border-b-4 border-[#FBD74F] bg-[#FFFFFF]"> {/* p-4 や border-b で区切り */}
          {/* 閉じるボタンをヘッダー右端に配置することも可能 */}
          <p className="text-xl mt-4">ポケモン名言図鑑</p>
        </div>

        {/* ★★★ サブヘッダー (2段目 - 濃い紺ゾーン) ★★★ */}
        <div className="sub-header py-2 px-6 bg-[#1C2A4D] flex justify-center"> {/* 例: 濃い紺背景、白文字 */}
          {/* ここに表示したい情報 (例: ゲームタイトル、キャラクターの分類など) を配置 */}
          <p className="text-sm text-[#F9C706] font-semibold underline decoration-3 underline-offset-4"> JPN </p>
        </div>

        {/* --- モーダルメインコンテンツ --- */}
        <div className="modal-content flex-grow overflow-y-auto p-12 bg-gradient-to-b from-[#194582] to-[#257492]">
          {/* ★★★ Flexboxコンテナを追加 ★★★ */}
          <div className="flex flex-col md:flex-row gap-6 items-end"> {/* md以上で横並び、それ以下で縦並び。gapで間隔調整 */}

            {/* 左カラム: 名言テキスト */}
            <div className="md:max-w-[60%] flex-1 justify-left"> {/* md以上で幅60%程度、それ以下で全幅 */}
              <h3 className="font-bold text-5xl text-[#FFFFFF]">
                {quote.name}
              </h3>
              {/* ★★★ 該当するゲームロゴを横に並べて表示 ★★★ */}
              {relevantGameLogos.length > 0 && (
                <div className="flex flex-wrap gap--10 mt-2 sm:mt-2 mb-10">
                  {relevantGameLogos.map(version => (
                    <div key={version.id} className="relative w-16 h-6 sm:w-18 sm:h-7"> {/* ロゴのサイズ調整 */}
                      <Image
                        src={version.logoSrc}
                        alt={`${version.displayName} ロゴ`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xl lg:text-xl text-[#FFFFFF] leading-relaxed whitespace-pre-line">
                {quote.tweet_content}
              </p>
            </div>

            {/* 右カラム: 画像 (画像がある場合のみ表示) */}
            {images.length > 0 && (
              <div className="w-full md:w-auto md:flex-shrink-0 md:max-w-[40%] flex flex-col items-center mt-4 md:mt-0">
                <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:min-h-[300px] mb-2"> {/* アスペクト比と最小高さ */}
                  <Image
                    src={images[currentImageIndex]} // 表示する画像URL
                    alt={`画像 ${currentImageIndex + 1}/${images.length}: ${quote.name}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg shadow-md"
                    onError={(e) => { // ★ この 'e' が使われていない
                      (e.target as HTMLImageElement).style.display = 'none'; // next/image ではこの方法は使えないことが多い
                      console.error("Failed to load image:");
                    }}
                  />
                </div>
                {images.length > 1 && ( // ★ 画像が複数ある場合のみナビゲーション表示
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <button onClick={handlePrevImage} className="btn btn-sm btn-circle">❮</button>
                    <span>{currentImageIndex + 1} / {images.length}</span>
                    <button onClick={handleNextImage} className="btn btn-sm btn-circle">❯</button>
                  </div>
                )}
              </div>
            )}
            {/* 画像がない場合のメッセージ */}
            {images.length === 0 && quote.game && ( // game属性はあるが画像URLリストが空の場合
                 <p className="text-center text-gray-500 italic my-4 md:w-[40%]">この名言の画像はありません</p>
            )}
          </div>
        </div>

        {/* --- モーダルフッター --- */}
        <div className="modal-footer px-4 border-t-4 border-[#FBD74F] flex justify-end gap-2 bg-[#FFFFFF]"> {/* p-4, border-t, flex で配置 */}
          <button className="btn btn-ghost" onClick={onClose}>
            Ⓑ もどる
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>,
    modalRootRef.current
  );
};