import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PokerScenario } from '@/types/poker';
import { ChevronRight, Target } from 'lucide-react-native';
import Card from './Card';

interface ScenarioCardProps {
  scenario: PokerScenario;
  onPress: () => void;
}

export default function ScenarioCard({ scenario, onPress }: ScenarioCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'EASY';
      case 'intermediate': return 'MEDIUM';
      case 'advanced': return 'HARD';
      default: return difficulty.toUpperCase();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{scenario.title}</Text>
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(scenario.difficulty) }
          ]}>
            <Text style={styles.difficultyText}>
              {getDifficultyLabel(scenario.difficulty)}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{scenario.description}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Position:</Text>
          <Text style={styles.detailValue}>{scenario.position}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Money in Pot:</Text>
          <Text style={styles.detailValue}>${scenario.potSize}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cost to Call:</Text>
          <Text style={styles.detailValue}>${scenario.betToCall}</Text>
        </View>
      </View>

      <View style={styles.cardsSection}>
        <Text style={styles.cardsLabel}>Your Cards:</Text>
        <View style={styles.cards}>
          {scenario.playerCards.map((card, index) => (
            <Card key={index} card={card} size="small" />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.evContainer}>
          <Target size={16} color="#3B82F6" />
          <Text style={styles.evText}>
            Expected: ${scenario.expectedValue.toFixed(2)}
          </Text>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  cardsSection: {
    marginBottom: 12,
  },
  cardsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
    marginBottom: 8,
  },
  cards: {
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  evContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  evText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
    marginLeft: 4,
  },
});