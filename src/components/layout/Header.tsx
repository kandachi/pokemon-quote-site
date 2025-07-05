export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          {/* Linkコンポーネントを使うと、クリックでトップページに戻れるようになり親切 */}
          <a href="/" className="btn btn-ghost normal-case text-xl">
            ポケモンの名言集
          </a>
        </div>
        {/* ここに将来的にテーマ切り替えボタンなどを追加していく */}
      </div>
    </header>
  );
}