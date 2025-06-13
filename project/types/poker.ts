export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface HandRange {
  hands: string[];
  percentage: number;
}

export interface GameState {
  id: string;
  playerCards: Card[];
  communityCards: Card[];
  position: string;
  stackSize: number;
  blinds: { small: number; big: number };
  potSize: number;
  betToCall: number;
  phase: 'preflop' | 'flop' | 'turn' | 'river';
  villainAction: string;
  villainBetSize?: number;
}

export interface HandEvaluation {
  handStrength: number;
  potOdds: number;
  expectedValue: number;
  correctAction: 'fold' | 'call' | 'raise';
  confidence: number;
  reasoning: string;
}

export interface DecisionResult {
  correct: boolean;
  userAction: 'fold' | 'call' | 'raise';
  correctAction: 'fold' | 'call' | 'raise';
  expectedValue: number;
  explanation: string;
  handStrength: number;
  potOdds: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
}

export interface UserStats {
  totalHands: number;
  correctDecisions: number;
  accuracy: number;
  averageEV: number;
  streak: number;
  bestStreak: number;
  level: number;
  experience: number;
  gradeDistribution: Record<string, number>;
}

export interface PokerScenario {
  id: string;
  title: string;
  description: string;
  position: string;
  stackSize: number;
  blinds: { small: number; big: number };
  potSize: number;
  betToCall: number;
  playerCards: Card[];
  communityCards: Card[];
  villainRange: HandRange;
  correctAction: 'fold' | 'call' | 'raise';
  expectedValue: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}