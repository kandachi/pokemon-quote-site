"use client";

import { useEffect, useMemo, useState } from 'react'; // ★ 必要なフックだけインポート
import type { Character, Quote } from '@/types';
import Image from 'next/image';

// ★ 必要なUI部品だけをインポート
import QuoteList from '@/components/features/quote/QuoteList';
import QuoteModal from '@/components/ui/QuoteModal';
import GameFilterButtons from '@/components/ui/GameFilterButtons';
import QuoteSearch from '@/components/features/quote/QuoteSearch';
import { useQuotesFilter } from '@/hooks/useQuotesFilter';
import { ALL_GAME_SERIES_DATA } from '@/constants';
import { getRelevantGameSeries } from '@/libs/GameUtils'; 
import CharacterName from '@/components/ui/CharacterName';

type Props = {
  initialQuotes: Quote[]; 
  character: Character;
};

export default function CharacterPageClient({ initialQuotes, character }: Props) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [currentTheme, setCurrentTheme] = useState<string>("light");
    const images = character.imageUrls || [];

    const {
        searchQuery,
        selectedGameSeriesId,
        setSearchQuery,
        setSelectedGameSeriesId,
        filteredQuotes
    } = useQuotesFilter(initialQuotes);

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

    const handleGameFilterClick = (seriesId: string | null) => {
        setSelectedGameSeriesId(seriesId);
        const selectedSeries = ALL_GAME_SERIES_DATA.find(s => s.seriesId === seriesId);
        setCurrentTheme(selectedSeries?.themeName || "light");
    };

    const relevantGameSeriesForCharacter = useMemo(() => {
        if (!character.game) {
            return [];
        }
        return getRelevantGameSeries(character.game);
    }, [character.game]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
      }, [currentTheme]);

    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <QuoteSearch
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                />

                <div className="w-full order-2 md:order-1">
                    <CharacterName character={character} />
                </div>

                {images.length > 0 && (
                    <div className="w-full md:w-auto md:mx-auto md:flex-shrink-0 md:max-w-[40%] flex flex-col items-center mt-4 md:mt-4">
                        <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:min-h-[300px] mb-2"> {/* アスペクト比と最小高さ */}
                            <Image
                                src={images[currentImageIndex]} // ★ 表示する画像URL
                                alt={`画像 ${currentImageIndex + 1}/${images.length}: ${character.name_ja}`}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                onError={(e) => { // この 'e' が使われていない
                                    (e.target as HTMLImageElement).style.display = 'none'; // next/image ではこの方法は使えないことが多い
                                    console.error("Failed to load image:");
                                }}
                            />

                            {images.length > 1 && ( // ★ 画像が複数ある場合のみナビゲーション表示
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        aria-label="前の画像へ"
                                        className="absolute top-1/2 -translate-y-1/2 left-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 focus:outline-none"
                                    >
                                        ❮
                                    </button>

                                    <button
                                        onClick={handleNextImage}
                                        aria-label="次の画像へ"
                                        className="absolute top-1/2 -translate-y-1/2 right-2 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 focus:outline-none"
                                    >
                                        ❯
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
                {/* 画像がない場合のメッセージ */}
                {images.length === 0 && character.game && ( // game属性はあるが画像URLリストが空の場合
                    <p className="text-center text-gray-500 italic my-4 md:w-[40%] md:mx-auto">このキャラクターの画像はありません</p>
                )}

                <GameFilterButtons
                    allGameSeries={relevantGameSeriesForCharacter}
                    selectedGameSeriesId={selectedGameSeriesId}
                    onFilterClick={handleGameFilterClick}
                />

                <div className="container mx-auto p-4 md:p-8">
                    <QuoteList
                        quotes={filteredQuotes} 
                        onQuoteClick={setSelectedQuote}
                    />
                </div>
            </div>
        
            {selectedQuote && (
                <QuoteModal
                    quote={selectedQuote}
                    onClose={() => setSelectedQuote(null)}
                />
            )}
        </>
    );
}