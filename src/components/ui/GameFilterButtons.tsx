"use client"; // もしイベントハンドラなどクライアント側の機能が必要なら

import Image from 'next/image';
import type { GameInfo } from '@/constants';

type GameFilterButtonsProps = {
  gameData: GameInfo[];
  selectedGameFilter: string | null;
  onFilterClick: (gameId: string | null) => void;
};

export default function GameFilterButtons({
  gameData,
  selectedGameFilter,
  onFilterClick,
}: GameFilterButtonsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3 sm:gap-4 justify-center items-center"> {/* gap調整 */}
      <button
        className={`btn btn-sm sm:btn-md ${selectedGameFilter === null ? 'btn-primary' : 'btn-outline'}` } // サイズ調整
        onClick={() => onFilterClick(null)}
        aria-pressed={selectedGameFilter === null} // アクセシビリティ
      >
        すべて表示
      </button>
      {gameData.map((game) => (
        <button
          key={game.id}
          className={`
            p-1 sm:p-2 rounded-lg transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            ${selectedGameFilter === game.id
              ? 'ring-4 ring-secondary shadow-lg transform scale-105 bg-primary' // 選択中のスタイル
              : 'hover:scale-105 hover:shadow-md opacity-80 hover:opacity-100 bg-secondary' // ホバー時のスタイル
            }
          `}
          onClick={() => onFilterClick(game.id)}
          aria-label={`フィルター: ${game.displayName}`} // アクセシビリティ
          aria-pressed={selectedGameFilter === game.id} // アクセシビリティ
        >
          <div className="relative w-16 h-10 sm:w-24 sm:h-14 md:w-28 md:h-16"> {/* サイズ調整 */}
            <Image
              src={game.imageSrc}
              alt={game.displayName}
              layout="fill" // 親要素にフィットさせる
              objectFit="contain" // アスペクト比を保ちつつ、コンテナに収まるように
              priority={true} // LCPになる可能性があればtrue (最初の数個など)
            />
          </div>
          {/* オプション: 画像の下にテキストを表示する場合 */}
          {/* <span className="text-xs mt-1 text-center block">{game.displayName}</span> */}
        </button>
      ))}
    </div>
  );
}