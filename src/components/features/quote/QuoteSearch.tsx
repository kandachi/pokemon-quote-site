"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/ui/SearchBar';
import SuggestionsList from '@/components/ui/SuggestionsList';
import { MAIN_CHARACTERS } from '@/constants';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

export default function QuoteSearch({ searchQuery, onSearchQueryChange }: Props) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isComposingRef = useRef(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSuggestionClick = (characterName: string) => {
    router.push(`/characters/${characterName}`);
  };

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    // 変換確定後、親のStateを更新してフィルタリングを実行
    onSearchQueryChange(e.currentTarget.value);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value); // 入力中はローカルの表示だけを更新
    // IME入力中ではない場合（英語入力など）は即座にフィルタリングを実行
    if (!isComposingRef.current) {
      onSearchQueryChange(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const characterNameSuggestions = inputValue.length > 0
    ? MAIN_CHARACTERS.filter(name =>
        name.toLowerCase().startsWith(inputValue.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div ref={searchContainerRef} className="relative mb-2">
      <SearchBar
        searchQuery={inputValue}
        onSearchQueryFocus={() => setShowSuggestions(true)}
        onSearchQueryKeyDown={(e) => e.key === 'Enter' && setShowSuggestions(false)}
        onSearchQueryChange={handleInputChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      {showSuggestions && (
        <SuggestionsList
          suggestions={characterNameSuggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}