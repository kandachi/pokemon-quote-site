import { FaTwitter } from 'react-icons/fa'; // 例: react-icons を使う場合
// npm install react-icons または yarn add react-icons

export default function Footer() {
  const twitterAccountUrl = "https://x.com/pokemonquote168"; // ★ あなたのTwitterアカウントURL

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside> {/* asideタグに変更してグループ化 */}
        <p>Copyright © {new Date().getFullYear()} - ポケモンの名言集. All right reserved.</p>
      </aside>
      <nav> {/* navタグでリンクをグループ化 */}
        <div className="grid grid-flow-col gap-4">
          <a
            href={twitterAccountUrl}
            target="_blank" // 新しいタブで開く
            rel="noopener noreferrer" // セキュリティ対策
            aria-label="Twitterアカウントへ"
            className="hover:opacity-75 transition-opacity"
          >
            {/* アイコンを使う場合 (例: react-icons) */}
            <FaTwitter size={24} />
            {/* テキストリンクの場合 */}
            {/* 公式Twitterアカウント */}
          </a>
          {/* 他のSNSリンクなどがあればここに追加 */}
        </div>
      </nav>
    </footer>
  );
}