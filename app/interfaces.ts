export interface Outcome {
  outcomeId: number;
  outcomeName: string;
  outcomeOdds: number;
  outcomePosition: number;
  isActive?: boolean;
}

export interface EventGame {
  gameId: number;
  gameName: string;
  gameType: number;
  outcomes: Outcome[];
}

export interface BettingEvent {
  eventId: number;
  eventName: string;
  eventStart: number;
  category3Name: string;
  category2Name: string;
  category1Name: string;
  gamesCount: number;
  eventGames: EventGame[];
}

export interface BetSelection {
  id: string;
  eventId: string;
  matchName: string;
  selectionName: string;
  marketName: string;
  odds: number;
  category: string;
  startTime: string;
}
