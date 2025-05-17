"use client"; // ReactDOM.createPortal を使うためクライアントコンポーネント

import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import type { Quote } from '@/types';

type QuoteModalProps = {
  quote: Quote;
  onClose: () => void;
  cloudfrontDomain: string | undefined;
};

const CLOUDFRONT_DOMAIN_NAME = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

// モーダルコンポーネント
export default function QuoteModal({ quote, onClose, cloudfrontDomain }: QuoteModalProps) {
  const modalRootRef = useRef<Element | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    modalRootRef.current = document.getElementById('modal-root');
  }, []);

  if (!isBrowser || !modalRootRef.current || !quote) { // quote が null の場合も考慮
    return null;
  }

  // 画像URLを組み立てる
  const imageUrl = quote.image_key && cloudfrontDomain
    ? `${cloudfrontDomain}/${quote.image_key}`
    : null;

  return ReactDOM.createPortal(
    <div className="modal modal-open">
      <div className="modal-box relative w-11/12 max-w-2xl">

        {/* ... (閉じるボタン、名言、キャラクター情報など) ... */}
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="overflow-y-auto px-4 py-6 max-h-[80vh]"> {/* 少し高さを許容 */}
          <p className="text-xl lg:text-2xl font-bold mb-4 leading-relaxed text-base-content whitespace-pre-line">
            {quote.tweet_content}
          </p>
          <p className="text-md mb-6 text-base-content">
            {quote.name}（{quote.game}）
          </p>
          <div className="divider my-4"></div>

          {imageUrl ? (
            <div className="my-4 flex justify-center">
              <img
                src={imageUrl}
                alt={`画像: ${quote.name} - ${quote.tweet_content.substring(0, 20)}...`}
                className="max-w-full h-auto max-h-[50vh] rounded-lg shadow-md object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  console.error("Failed to load image:", imageUrl);
                }}
              />
            </div>
          ) : (
            quote.image_key && !cloudfrontDomain ? (
              <p className="text-center text-error italic my-4">画像表示設定エラー</p> // エラー表示改善
            ) : (
              <p className="text-center text-gray-500 italic my-4">画像はありません</p> // 文字色調整
            )
          )}
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>,
    modalRootRef.current
  );
};