"use client"; // クライアントコンポーネントとしてマーク

import { useEffect, useState, useRef } from 'react';
import QuoteModal from '@/components/ui/QuoteModal';
import GameFilterButtons from '@/components/ui/GameFilterButtons';
import SearchBar from '@/components/ui/SearchBar';
import type { Quote } from '@/types';
import { GAME_TITLE_DATA, type GameInfo } from '@/constants'; 

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const CLOUDFRONT_DOMAIN_NAME = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

export default function HomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameFilter, setSelectedGameFilter] = useState<string | null>(null); // ゲームのIDでフィルター
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ
  const [currentTheme, setCurrentTheme] = useState<string>("light"); // デフォルトテーマ

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (!API_ENDPOINT || !CLOUDFRONT_DOMAIN_NAME) {
      console.error("環境変数が設定されていません。");
      // エラー処理やデフォルト値の設定など
      return;
    }
    fetch(API_ENDPOINT)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(responseData => {
        if (responseData && typeof responseData.body === 'string') {
          const quotesArray = JSON.parse(responseData.body);
          if (Array.isArray(quotesArray)) {
            setQuotes(quotesArray);
          } else {
            console.error("Parsed body is not an array:", quotesArray);
            setError("名言データの形式が正しくありません。");
            setQuotes([]);
          }
        } else {
          console.error("Response body is missing or not a string:", responseData);
          setError("APIからの応答が正しくありません。");
          setQuotes([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch quotes:", err);
        setError(`名言の読み込みに失敗しました: ${err.message}`);
        setQuotes([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);



  const filteredQuotes = quotes.filter(q => {
    const matchesSearchQuery =
      q.tweet_content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.game.toLowerCase().includes(searchQuery.toLowerCase());

    // ★★★ フィルタリングロジックを game.id と比較するように変更 ★★★
    // Quote 型に gameId のようなプロパティがあるか、
    // game プロパティ (文字列) と GAME_TITLE_DATA を照合する必要がある
    // ここでは、簡単のため quotes の game プロパティが GAME_TITLE_DATA の displayName と一致すると仮定
    // より堅牢にするには、Quote型に gameId のような識別子を持たせ、GAME_TITLE_DATAのidと照合する
    const gameInfoForQuote = GAME_TITLE_DATA.find(g => g.displayName === q.game);
    const matchesGameFilter = selectedGameFilter
      ? gameInfoForQuote?.id === selectedGameFilter
      : true;

    return matchesSearchQuery && matchesGameFilter;
  });

  const openModal = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const closeModal = () => {
    setSelectedQuote(null);
  };

  // ゲームタイトルフィルターボタンがクリックされたときの処理
  const handleGameFilterClick = (gameId: string | null) => {
    setSelectedGameFilter(gameId);

    if (gameId) {
      const selectedGame = GAME_TITLE_DATA.find(g => g.id === gameId);
      if (selectedGame && selectedGame.themeName) {
        setCurrentTheme(selectedGame.themeName);
      } else {
        setCurrentTheme("light"); // 対象ゲームにテーマがなければデフォルトに戻す
      }
    } else {
      setCurrentTheme("light"); // 「すべて表示」の場合はデフォルトテーマ
    }
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query); // 受け取ったクエリで state を更新
  };

  // ★★★ ステップ4の準備: useEffectでテーマをHTML要素に適用 ★★★
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]); // currentTheme が変更されたら実行

  return (
    // data-theme は src/app/layout.tsx の <html> タグに設定しても良い
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* ヘッダー */}
      <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">ポケモンの名言集</a>
          </div>
          {/* ここにテーマ切り替えボタンなどを追加可能 */}
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <SearchBar
          searchQuery={searchQuery} // 現在の検索クエリを渡す
          onSearchQueryChange={handleSearchQueryChange} // 検索クエリ変更時に呼び出す関数を渡す
        />

        {/* ★★★ ステップ4: ゲームタイトルボタンのJSXを実装 ★★★ */}
        <GameFilterButtons
          gameData={GAME_TITLE_DATA} // 拡張したデータを渡す
          selectedGameFilter={selectedGameFilter}
          onFilterClick={handleGameFilterClick}
        />

        {isLoading && (
          <div className="text-center py-10">
            <span className="loading loading-lg loading-spinner text-primary"></span>
            <p className="text-xl mt-4">名言を読み込み中...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <div role="alert" className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>エラー: {error}</span>
            </div>
          </div>
        )}

        {!isLoading && !error && filteredQuotes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((q) => (
              <div
                key={q.ID}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
                onClick={() => openModal(q)}
              >
                <div className="card-body">
                  <p className="text-lg font-semibold mb-2 leading-tight line-clamp-3 whitespace-pre-line">{q.tweet_content}</p> {/* 長文対策 */}
                  <p className="text-sm text-neutral-focus mt-1">
                    {q.name}（{q.game}）
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && filteredQuotes.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-neutral-content">
              {quotes.length > 0 ? "該当する名言が見つかりませんでした。" : "名言がありません。"}
            </p>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © {new Date().getFullYear()} - ポケモンの名言集. All right reserved.</p>
        </div>
      </footer>

      {/* ★★★ インポートした QuoteModal を使用 ★★★ */}
      {selectedQuote && (
        <QuoteModal
          quote={selectedQuote}
          onClose={closeModal}
          cloudfrontDomain={CLOUDFRONT_DOMAIN_NAME} // propsとして渡す
        />
      )}
    </div>
  );
}