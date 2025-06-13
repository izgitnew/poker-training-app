import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card as CardType } from '@/types/poker';
import { SUIT_SYMBOLS, SUIT_COLORS } from '@/utils/pokerLogic';

interface CardProps {
  card: CardType;
  size?: 'small' | 'medium' | 'large';
}

export default function Card({ card, size = 'medium' }: CardProps) {
  const sizeStyles = {
    small: { width: 32, height: 44, fontSize: 12 },
    medium: { width: 48, height: 66, fontSize: 16 },
    large: { width: 64, height: 88, fontSize: 20 }
  };

  const currentSize = sizeStyles[size];
  const suitColor = SUIT_COLORS[card.suit];

  return (
    <View style={[
      styles.card,
      {
        width: currentSize.width,
        height: currentSize.height,
      }
    ]}>
      <Text style={[
        styles.rank,
        {
          fontSize: currentSize.fontSize,
          color: suitColor
        }
      ]}>
        {card.rank}
      </Text>
      <Text style={[
        styles.suit,
        {
          fontSize: currentSize.fontSize * 0.8,
          color: suitColor
        }
      ]}>
        {SUIT_SYMBOLS[card.suit]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    margin: 2,
  },
  rank: {
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  suit: {
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginTop: -2,
  },
});