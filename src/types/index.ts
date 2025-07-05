export type Quote = {
  ID: string;
  tweet_content: string;
  name: string;
  game: string;
  imageUrls?: string[];
};

export type Character = {
  id: number;
  name_en: string;
  name_ja: string;
  game: string;
  imageUrls: string[];
  description: string;
};
