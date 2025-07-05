import HomePageClient from '@/components/HomePageClient'; // 作成したクライアントコンポーネントをインポート
import { getQuotes } from '@/libs/GetQuote';

// これがページの本体。asyncにするのを忘れずに！
export default async function HomePage() {
  try {
    // サーバーサイドでデータを取得する
    const initialQuotes = await getQuotes();

    // データ取得が成功したら、クライアントコンポーネントをレンダリングし、propsとして初期データを渡す
    return <HomePageClient initialQuotes={initialQuotes} />;

  } catch (error) {
    // データ取得に失敗した場合のエラー表示
    console.error(error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div role="alert" className="alert alert-error max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {/* @ts-expect-error error is of type unknown */}
          <span>エラー: 名言の読み込みに失敗しました。({error.message})</span>
        </div>
      </div>
    );
  }
}