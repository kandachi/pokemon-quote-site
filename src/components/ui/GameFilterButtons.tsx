// src/components/ui/GameFilterButtons.tsx
"use client";
import Image from 'next/image';
import type { GameSeriesInfo } from '@/constants';

type GameFilterButtonsProps = {
  allGameSeries: GameSeriesInfo[];
  selectedGameSeriesId: string | null;
  onFilterClick: (seriesId: string | null) => void;
};

export default function GameFilterButtons({
  allGameSeries,
  selectedGameSeriesId,
  onFilterClick,
}: GameFilterButtonsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3 sm:gap-4 justify-center items-stretch"> {/* items-stretch に変更 */}
      <button
        className={`btn btn-sm sm:btn-md bg-primary ${selectedGameSeriesId === null ? 'btn-primary' : 'btn-outline h-full'}`} // h-fullで高さを揃える
        onClick={() => onFilterClick(null)}
        aria-pressed={selectedGameSeriesId === null}
      >
        すべて表示
      </button>
      {allGameSeries.map((series) => (
        <button
          key={series.seriesId}
          className={`
            p-1 sm:p-2 rounded-lg transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            flex flex-col items-center justify-center gap-1 min-w-[80px] sm:min-w-[100px] bg-primary focus:bg-secondary
            ${selectedGameSeriesId === series.seriesId
              ? 'ring-4 ring-secondary shadow-lg transform scale-105 bg-opacity-10 bg-secondary' // 選択中のスタイル
              : 'hover:scale-105 hover:shadow-md opacity-80 hover:opacity-100'
            }
          `}
          onClick={() => onFilterClick(series.seriesId)}
          aria-label={`フィルター: ${series.seriesName}`}
          aria-pressed={selectedGameSeriesId === series.seriesId}
        >
          {/* 各バージョンのロゴを縦に並べる */}
          {series.versions.map(version => (
            <div key={version.id} className="relative w-16 h-5 sm:w-20 sm:h-6 md:w-24 md:h-7"> {/* ロゴのサイズ調整 */}
              <Image
                src={version.logoSrc}
                alt={`${version.displayName} ロゴ`}
                layout="fill"
                objectFit="contain"
                priority={true} // 最初の数個に設定
              />
            </div>
          ))}
          {/* オプション: シリーズ名テキスト */}
          {/* <span className="text-xs mt-1 text-center block">{series.seriesName}</span> */}
        </button>
      ))}
    </div>
  );
}