import { Card, Rank, Suit, GameState, HandEvaluation, DecisionResult } from '@/types/poker';

export const CARD_VALUES: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

export const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

export const SUIT_COLORS: Record<Suit, string> = {
  hearts: '#EF4444',
  diamonds: '#EF4444',
  clubs: '#1F2937',
  spades: '#1F2937'
};

const POSITIONS = ['Button', 'Small Blind', 'Big Blind', 'Under the Gun', 'Middle Position', 'Cutoff'];
const VILLAIN_ACTIONS = [
  { action: 'raises to', multiplier: 3, description: 'opponent raises' },
  { action: 'bets', multiplier: 0.7, description: 'opponent bets' },
  { action: 'goes all-in for', multiplier: 1, description: 'opponent goes all-in' },
  { action: 'raises to', multiplier: 2.5, description: 'opponent raises big' }
];

export function createDeck(): Card[] {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  
  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealNewHand(): GameState {
  const deck = createDeck();
  const playerCards = [deck[0], deck[1]];
  const position = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  const blinds = { small: 1, big: 2 };
  
  // Determine game phase and community cards
  const phases = ['preflop', 'flop', 'turn', 'river'] as const;
  const phase = phases[Math.floor(Math.random() * phases.length)];
  
  let communityCards: Card[] = [];
  let cardIndex = 2;
  
  if (phase === 'flop' || phase === 'turn' || phase === 'river') {
    communityCards = [deck[cardIndex], deck[cardIndex + 1], deck[cardIndex + 2]];
    cardIndex += 3;
  }
  if (phase === 'turn' || phase === 'river') {
    communityCards.push(deck[cardIndex]);
    cardIndex++;
  }
  if (phase === 'river') {
    communityCards.push(deck[cardIndex]);
  }
  
  // Generate realistic betting scenario
  const villainAction = VILLAIN_ACTIONS[Math.floor(Math.random() * VILLAIN_ACTIONS.length)];
  const basePot = blinds.small + blinds.big;
  const potSize = basePot + Math.floor(Math.random() * 20) + 5;
  const betToCall = Math.floor(potSize * villainAction.multiplier) + Math.floor(Math.random() * 5);
  
  return {
    id: Date.now().toString(),
    playerCards,
    communityCards,
    position,
    stackSize: 100,
    blinds,
    potSize,
    betToCall,
    phase,
    villainAction: villainAction.description,
    villainBetSize: betToCall
  };
}

export function evaluateHand(gameState: GameState): HandEvaluation {
  const { playerCards, communityCards, potSize, betToCall } = gameState;
  
  // Calculate hand strength
  const handStrength = calculateHandStrength(playerCards, communityCards);
  
  // Calculate pot odds
  const potOdds = betToCall / (potSize + betToCall);
  
  // Estimate win probability based on hand strength and board texture
  const winProbability = estimateWinProbability(handStrength, communityCards.length);
  
  // Calculate expected value
  const expectedValue = (winProbability * potSize) - ((1 - winProbability) * betToCall);
  
  // Determine correct action
  let correctAction: 'fold' | 'call' | 'raise';
  let confidence: number;
  let reasoning: string;
  
  if (winProbability < potOdds - 0.1) {
    correctAction = 'fold';
    confidence = Math.min(95, (potOdds - winProbability) * 200);
    reasoning = `Your hand is too weak against the opponent's likely range. You need to win ${(potOdds * 100).toFixed(1)}% of the time to break even, but you only win about ${(winProbability * 100).toFixed(1)}% of the time.`;
  } else if (winProbability > potOdds + 0.15 && handStrength > 60) {
    correctAction = 'raise';
    confidence = Math.min(95, (winProbability - potOdds) * 150);
    reasoning = `You have a strong hand with good equity. Raising for value will make money against weaker hands that might call.`;
  } else {
    correctAction = 'call';
    confidence = Math.max(60, 100 - Math.abs(winProbability - potOdds) * 200);
    reasoning = `Your hand has decent equity against the opponent's range. The pot odds make calling profitable.`;
  }
  
  return {
    handStrength,
    potOdds,
    expectedValue,
    correctAction,
    confidence,
    reasoning
  };
}

function calculateHandStrength(playerCards: Card[], communityCards: Card[]): number {
  const allCards = [...playerCards, ...communityCards];
  if (allCards.length < 2) return 0;
  
  const values = playerCards.map(card => CARD_VALUES[card.rank]).sort((a, b) => b - a);
  const suits = playerCards.map(card => card.suit);
  
  let strength = 0;
  
  // Base hand strength from hole cards
  strength += values[0] * 2; // High card value
  strength += values[1] * 1; // Second card value
  
  // Pocket pair bonus
  if (values[0] === values[1]) {
    strength += 25;
    if (values[0] >= 10) strength += 15; // Premium pairs
  }
  
  // Suited bonus
  if (suits[0] === suits[1]) {
    strength += 8;
  }
  
  // Connected cards
  if (Math.abs(values[0] - values[1]) === 1) {
    strength += 6;
  }
  
  // Broadway cards (10, J, Q, K, A)
  if (values[0] >= 10 && values[1] >= 10) {
    strength += 10;
  }
  
  // Post-flop adjustments
  if (communityCards.length >= 3) {
    const communityValues = communityCards.map(card => CARD_VALUES[card.rank]);
    
    // Check for pairs with board
    for (const playerValue of values) {
      if (communityValues.includes(playerValue)) {
        strength += 20; // Made a pair
        break;
      }
    }
    
    // Check for high cards on board
    const highBoard = communityValues.some(val => val >= 11);
    if (highBoard && values[0] < 11) {
      strength -= 10; // Penalty for low cards on high board
    }
  }
  
  return Math.min(100, Math.max(0, strength));
}

function estimateWinProbability(handStrength: number, boardCards: number): number {
  // Base win probability from hand strength
  let winProb = handStrength / 100;
  
  // Adjust based on number of board cards (more cards = more certainty)
  if (boardCards === 0) {
    // Pre-flop: more variance
    winProb = winProb * 0.8 + 0.1;
  } else if (boardCards === 3) {
    // Flop: moderate adjustment
    winProb = winProb * 0.9 + 0.05;
  } else if (boardCards >= 4) {
    // Turn/River: hand strength is more reliable
    winProb = winProb * 0.95;
  }
  
  return Math.min(0.95, Math.max(0.05, winProb));
}

export function gradeDecision(
  userAction: 'fold' | 'call' | 'raise',
  evaluation: HandEvaluation
): DecisionResult {
  const { correctAction, expectedValue, reasoning, handStrength, potOdds } = evaluation;
  const correct = userAction === correctAction;
  
  // Calculate grade based on decision quality
  let grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  
  if (correct) {
    if (evaluation.confidence >= 90) grade = 'A+';
    else if (evaluation.confidence >= 80) grade = 'A';
    else if (evaluation.confidence >= 70) grade = 'B+';
    else grade = 'B';
  } else {
    // Wrong decision - grade based on how bad it was
    const actionValues = { fold: 0, call: 1, raise: 2 };
    const userValue = actionValues[userAction];
    const correctValue = actionValues[correctAction];
    const difference = Math.abs(userValue - correctValue);
    
    if (difference === 1 && evaluation.confidence < 70) grade = 'C+';
    else if (difference === 1) grade = 'C';
    else if (difference === 2 && evaluation.confidence < 80) grade = 'D';
    else grade = 'F';
  }
  
  return {
    correct,
    userAction,
    correctAction,
    expectedValue,
    explanation: reasoning,
    handStrength,
    potOdds,
    grade
  };
}

export function formatCard(card: Card): string {
  return `${card.rank}${SUIT_SYMBOLS[card.suit]}`;
}

export function getPhaseDescription(phase: string): string {
  switch (phase) {
    case 'preflop': return 'Before the flop';
    case 'flop': return 'After the flop';
    case 'turn': return 'After the turn';
    case 'river': return 'After the river';
    default: return phase;
  }
}

export function getPositionDescription(position: string): string {
  const descriptions: Record<string, string> = {
    'Button': 'Button (best position)',
    'Small Blind': 'Small Blind',
    'Big Blind': 'Big Blind',
    'Under the Gun': 'Under the Gun (early)',
    'Middle Position': 'Middle Position',
    'Cutoff': 'Cutoff (late position)'
  };
  return descriptions[position] || position;
}