"use client";

type SuggestionsListProps = {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
};

export default function SuggestionsList({
  suggestions,
  onSuggestionClick,
}: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul
      className="absolute top-full z-10 w-full bg-base-100 border border-base-300 rounded-b-lg shadow-lg max-h-60 overflow-y-auto"
      // mt-1 で検索バーのすぐ下に表示
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-base-200 cursor-pointer"
          onClick={() => onSuggestionClick(suggestion)}
          // onMouseDown を使うと、検索バーの onBlur より先に実行されることがある
          // onMouseDown={(e) => { e.preventDefault(); onSuggestionClick(suggestion); }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
}