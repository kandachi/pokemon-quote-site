"use client";

import { useState, useEffect } from 'react';
import { useQuotesFilter } from '@/hooks/useQuotesFilter'; // ★ フィルタリングロジック
import type { Quote } from '@/types';

// UI/Feature Components
import GameFilterButtons from '@/components/ui/GameFilterButtons';
import QuoteModal from '@/components/ui/QuoteModal';
import QuoteList from '@/components/features/quote/QuoteList';
import QuoteSearch from '@/components/features/quote/QuoteSearch';
import { ALL_GAME_SERIES_DATA } from '@/constants';

type Props = {
  initialQuotes: Quote[];
};

export default function HomePageClient({ initialQuotes }: Props) {
  const {
    searchQuery,
    selectedGameSeriesId,
    setSearchQuery,
    setSelectedGameSeriesId,
    filteredQuotes
  } = useQuotesFilter(initialQuotes);

  // 2. モーダルとテーマ表示のためのStateは、このページが持つ
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  const handleGameFilterClick = (seriesId: string | null) => {
    setSelectedGameSeriesId(seriesId);
    const selectedSeries = ALL_GAME_SERIES_DATA.find(s => s.seriesId === seriesId);
    setCurrentTheme(selectedSeries?.themeName || "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        {/* 3. 必要なUI部品をすべて組み立てる */}
        <QuoteSearch
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
        <GameFilterButtons
          allGameSeries={ALL_GAME_SERIES_DATA}
          selectedGameSeriesId={selectedGameSeriesId}
          onFilterClick={handleGameFilterClick}
        />
        <QuoteList
          quotes={filteredQuotes} // フィルタリング後のリストを渡す
          onQuoteClick={setSelectedQuote}
        />
      </div>
      {selectedQuote && (
        <QuoteModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} />
      )}
    </>
  );
}