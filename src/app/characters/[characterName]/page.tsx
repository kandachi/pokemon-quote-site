import CharacterPageClient from '@/app/characters/[characterName]/CharacterPageClient'; // ★ これから作るクライアントコンポーネント
import { MAIN_CHARACTERS } from '@/constants';
import { getQuotes } from '@/libs/GetQuote';
import { getCharacters } from '@/libs/GetCharacter';

export const dynamic = 'force-dynamic';

// 特定キャラクターの名言データを取得する非同期関数（仮）
export async function generateStaticParams() {
  try {
    const allCharacters = await getCharacters();

    const names = allCharacters.map(item => item.name_ja);

    const paths = names.map((name) => ({
      characterName: name, 
    }));

    return paths;

  } catch (error) {
    console.error("Failed to fetch character names from DynamoDB:", error);
    return [];
  }
}

export default async function CharacterPage({ params }: { params: Promise<{ characterName: string }> }) {
  const resolvedParams = (await params).characterName;
  const characterName = decodeURIComponent(resolvedParams);
  const allCharacters = await getCharacters();
  const character = allCharacters.find(c => c.name_ja === characterName);

  if (!character) { 
      throw new Error(`キャラクター "${characterName}" のデータが見つかりません。`);
  }

  // サーバーサイドでそのキャラクターの名言だけを取得
  const allQuotes = await getQuotes();
  const characterQuotes = allQuotes.filter(q => q.name === characterName);

  // クライアントコンポーネントに初期データを渡す
  return (
    <div>
      <CharacterPageClient initialQuotes={characterQuotes} character={character} />
    </div>
  );
}