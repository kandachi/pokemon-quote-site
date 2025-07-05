import Link from 'next/link';

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex-none">
          <label 
            htmlFor="my-drawer" 
            className="btn btn-square btn-ghost drawer-button"
            aria-label="メニューを開く"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>

        <div className="flex-1">
          {/* Linkコンポーネントを使うと、クリックでトップページに戻れるようになり親切 */}
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            ポケモンの名言集
          </Link>
        </div>
      </div>
    </header>
  );
}