"use client"; // クライアントコンポーネントとしてマーク

import { useEffect, useState } from 'react';
import QuoteModal from '@/components/ui/QuoteModal';
import GameFilterButtons from '@/components/ui/GameFilterButtons';
import SearchBar from '@/components/ui/SearchBar';
import type { Quote } from '@/types';
import { ALL_GAME_SERIES_DATA, GAME_ID_TO_SERIES_ID_MAP } from '@/constants';
import Footer from '@/components/layout/Footer';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const CLOUDFRONT_DOMAIN_NAME = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

export default function HomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameSeriesId, setSelectedGameSeriesId] = useState<string | null>(null); // フィルター対象のシリーズID
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ
  const [currentTheme, setCurrentTheme] = useState<string>("light");

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
          // APIがエラーを返した場合 (例: 4xx, 5xx) でも、レスポンスボディがあるかもしれないのでパースを試みる
          return res.json().then(errData => {
            // エラーレスポンスの形式に合わせてエラーメッセージを組み立てる
            const message = errData?.error || errData?.message || `HTTP error! status: ${res.status}`;
            throw new Error(message);
          }).catch(() => { // JSONパースに失敗した場合はステータスコードのみでエラー
            throw new Error(`HTTP error! status: ${res.status}`);
          });
        }
        return res.json(); // ★ レスポンス全体をJSONとしてパース
      })
      .then(responseData => { // ★ responseData は { statusCode: ..., headers: ..., body: "..." } の形を期待
      console.log('API Gateway Proxy Response (responseData):', responseData);
      try {
        // responseData.body が文字列で、その中身がJSON配列のはず
        if (responseData && typeof responseData.body === 'string') {
          const quotesArray = JSON.parse(responseData.body); // body文字列をJSON配列にパース
          console.log('Parsed quotesArray from responseData.body:', quotesArray);
          if (Array.isArray(quotesArray)) {
            setQuotes(quotesArray as Quote[]);
          } else {
            console.error("Parsed body is not an array:", quotesArray);
            setError("名言データの形式が正しくありません (body内のデータが配列ではありません)。");
            setQuotes([]);
          }
        } else {
          console.error("Response body is missing or not a string:", responseData);
          // Lambdaがエラーを返した場合、responseData.body が存在しないか、文字列でないことがある
          // その場合、responseData.message や responseData.error にエラー内容が含まれているか確認
          const apiErrorMessage = responseData?.message || responseData?.error || "APIからの応答形式が正しくありません (bodyが文字列ではありません)。";
          setError(apiErrorMessage);
          setQuotes([]);
        }
      } catch (e: unknown) { // ★★★ unknown 型に変更 ★★★
        console.error("Failed to parse response body:", e);
        let errorMessage = "レスポンスボディの解析中に不明なエラーが発生しました。";
        if (e instanceof Error) { // ★★★ 型ガード ★★★
          errorMessage = `レスポンスボディの解析に失敗しました: ${e.message}`;
        } else if (typeof e === 'string') {
          errorMessage = e;
        }
        setError(errorMessage);
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

    // ★★★ フィルタリングロジックの変更 ★★★
    const quoteGameIds = q.game.split('/').map(id => id.trim()); // "Pt/HGSS" -> ["Pt", "HGSS"]
    const quoteSeriesIds = quoteGameIds.map(id => GAME_ID_TO_SERIES_ID_MAP[id] || id); // "Pt" -> "dppt", "HGSS" -> "hgss"

    const matchesGameFilter = selectedGameSeriesId
      ? quoteSeriesIds.includes(selectedGameSeriesId) // 名言のシリーズIDのいずれかが選択されたシリーズIDと一致するか
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
  const handleGameFilterClick = (seriesId: string | null) => {
    setSelectedGameSeriesId(seriesId);

    if (seriesId) {
      const selectedSeries = ALL_GAME_SERIES_DATA.find(s => s.seriesId === seriesId);
      if (selectedSeries && selectedSeries.themeName) {
        setCurrentTheme(selectedSeries.themeName);
      } else {
        setCurrentTheme("light");
      }
    } else {
      setCurrentTheme("light");
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
          allGameSeries={ALL_GAME_SERIES_DATA} // 渡すデータを変更
          selectedGameSeriesId={selectedGameSeriesId} // 渡すstateを変更
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
                  <p className="text-lg font-bold mb-2 leading-tight line-clamp-3 whitespace-pre-line">
                    {q.tweet_content}
                  </p> {/* 長文対策 */}
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
      <Footer/>

      {/* ★★★ インポートした QuoteModal を使用 ★★★ */}
      {selectedQuote && (
        <QuoteModal
          quote={selectedQuote}
          onClose={closeModal}
        />
      )}
    </div>
  );
}