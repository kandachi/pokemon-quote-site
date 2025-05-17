"use client"; // もしイベントハンドラなどクライアント側の機能が必要なら

type SearchBarProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void
};

export default function SearchBar({
  searchQuery,
  onSearchQueryChange,
}: SearchBarProps) {
    return (
        <div className="mb-8">
            <input
                type="text"
                placeholder="名言、キャラクター、ゲーム名で検索..."
                className="input input-bordered w-full shadow-sm focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
            />
        </div>
    );
}