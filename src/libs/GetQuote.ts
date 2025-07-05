import type { Quote } from '@/types';

// データ取得ロジックを独立した非同期関数に切り出す
export async function getQuotes(): Promise<Quote[]> {
  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/quotes`;

  if (!API_ENDPOINT) {
    console.error("環境変数 'API_ENDPOINT' が設定されていません。");
    throw new Error("APIエンドポイントが設定されていません。");
  }

  // Next.jsが拡張したfetch API。自動的にキャッシュを最適化してくれる！
  const res = await fetch(API_ENDPOINT, { next: { revalidate: 3600 } }); // 1時間キャッシュ

  if (!res.ok) {
    // エラーハンドリング
    throw new Error(`Failed to fetch quotes. Status: ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("APIからの応答形式が正しくありません (配列ではありません)。");
  }
  return data;
}