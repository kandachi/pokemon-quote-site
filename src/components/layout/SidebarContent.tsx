"use client";

import Link from 'next/link';
import { useCharacterSuggestions } from '@/contexts/CharacterContext';

type Props = {
  onLinkClick: () => void; // リンクがクリックされたときに呼ばれる関数
};

// このコンポーネントは、Drawerの「中身」だけを担当します
export default function SidebarContent({ onLinkClick }: Props) {
  const allCharacters = useCharacterSuggestions();

  return (
    // ★ DaisyUIのmenuコンポーネントをそのまま使う
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li>
        <Link href="/" className='btn btn-ghost normal-case text-lg justify-start' onClick={onLinkClick}>
          メインページ
        </Link>
      </li>
      <li className="menu-title text-sm mt-4">
        <span>キャラクター一覧</span>
      </li>
      {allCharacters.map(char => (
        <li key={char.name_ja}>
          {/* リンクをクリックしたら親から渡された関数を実行 */}
          <Link href={`/characters/${char.name_ja}`} onClick={onLinkClick}>
            {char.name_ja}
          </Link>
        </li>
      ))}
    </ul>
  );
}