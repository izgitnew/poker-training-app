export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'basics' | 'betting' | 'positions' | 'hands' | 'strategy';
}

export const POKER_GLOSSARY: GlossaryTerm[] = [
  // Basics
  {
    term: 'Blinds',
    definition: 'Forced bets that start the action. Small blind is half the big blind amount.',
    category: 'basics'
  },
  {
    term: 'Pot',
    definition: 'The total amount of money bet by all players in a hand.',
    category: 'basics'
  },
  {
    term: 'Stack',
    definition: 'The total amount of chips a player has.',
    category: 'basics'
  },
  {
    term: 'Community Cards',
    definition: 'Cards dealt face-up that all players can use (flop, turn, river).',
    category: 'basics'
  },
  {
    term: 'Hole Cards',
    definition: 'The two private cards dealt to each player.',
    category: 'basics'
  },

  // Betting Actions
  {
    term: 'Fold',
    definition: 'Give up your hand and forfeit any money already bet.',
    category: 'betting'
  },
  {
    term: 'Call',
    definition: 'Match the current bet to stay in the hand.',
    category: 'betting'
  },
  {
    term: 'Raise',
    definition: 'Increase the current bet, forcing others to call more or fold.',
    category: 'betting'
  },
  {
    term: 'Check',
    definition: 'Pass the action without betting (only when no bet is required).',
    category: 'betting'
  },
  {
    term: 'All-in',
    definition: 'Bet all remaining chips.',
    category: 'betting'
  },

  // Positions
  {
    term: 'Button',
    definition: 'The best position - acts last on all betting rounds after the flop.',
    category: 'positions'
  },
  {
    term: 'Small Blind',
    definition: 'Position that posts the smaller forced bet and acts first after the flop.',
    category: 'positions'
  },
  {
    term: 'Big Blind',
    definition: 'Position that posts the larger forced bet and acts last preflop.',
    category: 'positions'
  },
  {
    term: 'Under the Gun',
    definition: 'First position to act preflop - the tightest position.',
    category: 'positions'
  },
  {
    term: 'Cutoff',
    definition: 'Position to the right of the button - second best position.',
    category: 'positions'
  },

  // Hand Strength
  {
    term: 'Pocket Pair',
    definition: 'Two cards of the same rank as your hole cards (e.g., AA, KK, 88).',
    category: 'hands'
  },
  {
    term: 'Suited',
    definition: 'Two cards of the same suit (hearts, diamonds, clubs, or spades).',
    category: 'hands'
  },
  {
    term: 'Connectors',
    definition: 'Cards that are next to each other in rank (e.g., 8-9, J-Q).',
    category: 'hands'
  },
  {
    term: 'Broadway',
    definition: 'Cards ten and above (10, J, Q, K, A).',
    category: 'hands'
  },
  {
    term: 'Top Pair',
    definition: 'Pairing your hole card with the highest card on the board.',
    category: 'hands'
  },

  // Strategy Terms
  {
    term: 'Pot Odds',
    definition: 'The ratio of the current pot size to the cost of calling.',
    category: 'strategy'
  },
  {
    term: 'Expected Value (EV)',
    definition: 'The average profit or loss of a decision over many repetitions.',
    category: 'strategy'
  },
  {
    term: 'Equity',
    definition: 'Your percentage chance of winning the hand.',
    category: 'strategy'
  },
  {
    term: 'Range',
    definition: 'All possible hands an opponent might have in a situation.',
    category: 'strategy'
  },
  {
    term: 'Value Bet',
    definition: 'Betting with a strong hand to get called by weaker hands.',
    category: 'strategy'
  },
  {
    term: 'Bluff',
    definition: 'Betting with a weak hand to make opponents fold better hands.',
    category: 'strategy'
  }
];

export function getTermDefinition(term: string): string | null {
  const found = POKER_GLOSSARY.find(
    item => item.term.toLowerCase() === term.toLowerCase()
  );
  return found ? found.definition : null;
}

export function getTermsByCategory(category: string): GlossaryTerm[] {
  return POKER_GLOSSARY.filter(term => term.category === category);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowercaseQuery = query.toLowerCase();
  return POKER_GLOSSARY.filter(
    term => 
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.definition.toLowerCase().includes(lowercaseQuery)
  );
}