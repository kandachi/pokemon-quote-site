"use client";

import { createContext, useContext, type ReactNode } from 'react';
import type { Character } from '@/types';

// Contextを作成。初期値は空の配列
const CharacterContext = createContext<Character[]>([]);

// ★ このContextからデータを簡単に取り出すためのカスタムフック
export const useCharacterSuggestions = () => {
  return useContext(CharacterContext);
};

// ★ Contextにデータを渡すためのプロバイダーコンポーネント
type Props = {
  children: ReactNode;
  characters: Character[]; // サーバーから受け取る初期データ
};

export const CharacterProvider = ({ children, characters }: Props) => {
  return (
    <CharacterContext.Provider value={characters}>
      {children}
    </CharacterContext.Provider>
  );
};