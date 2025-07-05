import type { Character } from '@/types'; // あなたのCharacter型

// キャラクター一覧を取得する関数
export async function getCharacters(): Promise<Character[]> {
  // 環境変数からAPIエンドポイントを取得するのが望ましい
  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/characters`; 
  if (!API_ENDPOINT) {
    console.error("キャラクターAPIのエンドポイントが設定されていません。");
    return []; // またはエラーをスローする
  }

  try {
    // ★ Next.jsの拡張fetchが自動的にリクエストをキャッシュしてくれる
    const response = await fetch(API_ENDPOINT, {
      next: { revalidate: 3600 } // 例: 1時間ごとにキャッシュを再検証
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    // bodyはJSON文字列なので、一度パースする必要がある
    const result = await response.json();
    const characters: Character[] = JSON.parse(result.body);
    
    return characters;

  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return []; // エラー時は空の配列を返す
  }
}