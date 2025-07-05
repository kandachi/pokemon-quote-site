import { useState, useMemo } from 'react';
import type { Quote } from '@/types';
import { GAME_ID_TO_SERIES_ID_MAP } from '@/constants';

// カスタムフックの定義
// 初期の名言リストを引数として受け取る
export function useQuotesFilter(initialQuotes: Quote[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameSeriesId, setSelectedGameSeriesId] = useState<string | null>(null);

  // フィルタリングロジック
  // useMemoを使って、依存する値が変わった時だけ再計算するように最適化
  const filteredQuotes = useMemo(() => {
    return initialQuotes.filter(q => {
      // searchQueryが空の場合は常にtrue
      const matchesSearchQuery = searchQuery
        ? q.tweet_content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      // selectedGameSeriesIdがなければ常にtrue
      const matchesGameFilter = selectedGameSeriesId
        ? q.game.split('/').map(id => GAME_ID_TO_SERIES_ID_MAP[id] || id).includes(selectedGameSeriesId)
        : true;

      return matchesSearchQuery && matchesGameFilter;
    });
  }, [initialQuotes, searchQuery, selectedGameSeriesId]); // これらの値が変わった時だけ再実行

  // このフックを使うコンポーネントが必要とする値や関数を返す
  return {
    // State
    searchQuery,
    selectedGameSeriesId,
    // Stateを更新する関数
    setSearchQuery,
    setSelectedGameSeriesId,
    // 計算結果
    filteredQuotes,
  };
}