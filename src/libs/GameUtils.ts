import { 
  ALL_GAME_SERIES_DATA, 
  GAME_ID_TO_SERIES_ID_MAP, 
  type GameSeriesInfo 
} from '@/constants';

/**
 * ゲームID文字列 (例: "金銀/HGSS") を受け取り、
 * 対応する GameSeriesInfo の配列を返すヘルパー関数
 * @param gameString - キャラクターデータに含まれるゲーム文字列
 * @returns 該当するゲームシリーズ情報の配列
 */
export const getRelevantGameSeries = (gameString: string): GameSeriesInfo[] => {
  // 1. "/"で区切ってゲームIDの配列にする (例: ["金銀", "HGSS"])
  const gameIdsFromCharacter = gameString.split('/').map(s => s.trim());
  
  // 2. gameIdsから対応するseriesIdのSetを作成する (例: Set {"gs", "hgss"})
  //    重複するシリーズを排除できる (例: "DPt/Pt" -> "dppt" のみが残る)
  const relevantSeriesIdSet = new Set<string>();
  gameIdsFromCharacter.forEach(gameId => {
    const mappedSeriesId = GAME_ID_TO_SERIES_ID_MAP[gameId];
    if (mappedSeriesId) {
      relevantSeriesIdSet.add(mappedSeriesId);
    } else {
      // マップにない場合、gameId自体がseriesIdかもしれないので直接追加を試みる
      // (このロジックが必要な場合にコメントを外す)
      // relevantSeriesIdSet.add(gameId); 
      console.warn(`'${gameId}' に対応するシリーズIDがGAME_ID_TO_SERIES_ID_MAPに見つかりません。`);
    }
  });

  // 3. seriesIdのSetを使って、ALL_GAME_SERIES_DATAから該当するGameSeriesInfoオブジェクトを抽出する
  const relevantSeries = ALL_GAME_SERIES_DATA.filter(series => 
    relevantSeriesIdSet.has(series.seriesId)
  );

  return relevantSeries;
};