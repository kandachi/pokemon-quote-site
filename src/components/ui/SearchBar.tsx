"use client"; // もしイベントハンドラなどクライアント側の機能が必要なら

type SearchBarProps = {
  searchQuery: string;
  onSearchQueryFocus: () => void;
  onSearchQueryKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchQueryChange: (query: string) => void;
  onCompositionStart: () => void;
  onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  searchQuery,
  onSearchQueryFocus,
  onSearchQueryKeyDown,
  onSearchQueryChange,
  onCompositionStart,
  onCompositionEnd,
}: SearchBarProps) {
    return (
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="名言、キャラクター、ゲーム名で検索..."
          className="input input-bordered w-full shadow-sm focus:ring-primary focus:border-primary"
          value={searchQuery}
          onFocus={onSearchQueryFocus}
          onKeyDown={(e) => onSearchQueryKeyDown(e)}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        />
      </div>
    );
}