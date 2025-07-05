import type { Quote } from '@/types';

type Props = {
  quotes: Quote[];
  onQuoteClick: (quote: Quote) => void; // 親にどの名言がクリックされたか通知する
};

export default function QuoteList({ quotes, onQuoteClick }: Props) {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-neutral-content">
          該当する名言が見つかりませんでした。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((q) => (
        <div
          key={q.ID}
          className="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
          onClick={() => onQuoteClick(q)} // クリック時に親から渡された関数を呼ぶ
        >
          <div className="card-body">
            <p className="text-lg font-bold mb-2 leading-tight line-clamp-3 whitespace-pre-line">
              {q.tweet_content}
            </p>
            <p className="text-sm text-neutral-focus mt-1">
              {q.name}（{q.game}）
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}