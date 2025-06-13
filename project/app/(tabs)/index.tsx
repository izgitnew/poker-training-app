import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { dealNewHand, evaluateHand, gradeDecision, getPhaseDescription, getPositionDescription } from '@/utils/pokerLogic';
import { GameState, DecisionResult, UserStats } from '@/types/poker';
import ActionButton from '@/components/ActionButton';
import Card from '@/components/Card';
import PositionDiagram from '@/components/PositionDiagram';
import { 
  Brain, 
  Shuffle,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react-native';

export default function PracticeScreen() {
  const [currentHand, setCurrentHand] = useState<GameState | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<DecisionResult | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalHands: 0,
    correctDecisions: 0,
    accuracy: 0,
    averageEV: 0,
    streak: 0,
    bestStreak: 0,
    level: 1,
    experience: 0,
    gradeDistribution: {}
  });

  useEffect(() => {
    dealNewHandToUser();
  }, []);

  const dealNewHandToUser = () => {
    const newHand = dealNewHand();
    setCurrentHand(newHand);
    setShowResult(false);
    setLastResult(null);
  };

  const handleDecision = (action: 'fold' | 'call' | 'raise') => {
    if (!currentHand) return;

    const evaluation = evaluateHand(currentHand);
    const result = gradeDecision(action, evaluation);
    
    setLastResult(result);
    setShowResult(true);

    // Update stats
    setUserStats(prev => {
      const newTotalHands = prev.totalHands + 1;
      const newCorrectDecisions = prev.correctDecisions + (result.correct ? 1 : 0);
      const newAccuracy = (newCorrectDecisions / newTotalHands) * 100;
      const newStreak = result.correct ? prev.streak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      
      // Update grade distribution
      const newGradeDistribution = { ...prev.gradeDistribution };
      newGradeDistribution[result.grade] = (newGradeDistribution[result.grade] || 0) + 1;
      
      // Calculate experience and level
      const experienceGain = result.correct ? 10 : 5;
      const newExperience = prev.experience + experienceGain;
      const newLevel = Math.floor(newExperience / 100) + 1;
      
      return {
        totalHands: newTotalHands,
        correctDecisions: newCorrectDecisions,
        accuracy: newAccuracy,
        averageEV: ((prev.averageEV * prev.totalHands) + result.expectedValue) / newTotalHands,
        streak: newStreak,
        bestStreak: newBestStreak,
        level: newLevel,
        experience: newExperience,
        gradeDistribution: newGradeDistribution
      };
    });
  };

  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      'A+': '#10B981', 'A': '#10B981', 'B+': '#059669', 'B': '#059669',
      'C+': '#F59E0B', 'C': '#F59E0B', 'D': '#EF4444', 'F': '#DC2626'
    };
    return colors[grade] || '#6B7280';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Brain size={28} color="#3B82F6" />
          <Text style={styles.title}>Live Poker Trainer</Text>
        </View>
        <Text style={styles.subtitle}>
          Practice with real poker situations
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.totalHands}</Text>
          <Text style={styles.statLabel}>Hands Played</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.accuracy.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.streak}</Text>
          <Text style={styles.statLabel}>Win Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Lv.{userStats.level}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
      </View>

      {currentHand && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.handContainer}>
            <View style={styles.handHeader}>
              <Text style={styles.handTitle}>
                {getPhaseDescription(currentHand.phase)}
              </Text>
              <TouchableOpacity 
                style={styles.newHandButton}
                onPress={dealNewHandToUser}
              >
                <Shuffle size={20} color="#3B82F6" />
                <Text style={styles.newHandText}>New Hand</Text>
              </TouchableOpacity>
            </View>

            {/* Position Diagram */}
            <PositionDiagram currentPosition={currentHand.position} />

            <View style={styles.gameInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Your Chips:</Text>
                <Text style={styles.infoValue}>${currentHand.stackSize}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Blinds:</Text>
                <Text style={styles.infoValue}>
                  ${currentHand.blinds.small}/${currentHand.blinds.big}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pot Size:</Text>
                <Text style={styles.infoValue}>${currentHand.potSize}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>To Call:</Text>
                <Text style={styles.infoValue}>${currentHand.betToCall}</Text>
              </View>
            </View>

            <View style={styles.situationContainer}>
              <View style={styles.situationHeader}>
                <Text style={styles.situationTitle}>Situation</Text>
                <HelpCircle size={16} color="#F59E0B" />
              </View>
              <Text style={styles.situationText}>
                You're in {currentHand.position.toLowerCase()} position. {currentHand.villainAction} ${currentHand.betToCall}. 
                The pot is ${currentHand.potSize}. What's your move?
              </Text>
            </View>

            <View style={styles.cardsContainer}>
              <Text style={styles.cardsTitle}>Your Cards</Text>
              <View style={styles.playerCards}>
                {currentHand.playerCards.map((card, index) => (
                  <Card key={index} card={card} size="large" />
                ))}
              </View>
            </View>

            {currentHand.communityCards.length > 0 && (
              <View style={styles.cardsContainer}>
                <Text style={styles.cardsTitle}>Board Cards</Text>
                <View style={styles.communityCards}>
                  {currentHand.communityCards.map((card, index) => (
                    <Card key={index} card={card} size="medium" />
                  ))}
                </View>
              </View>
            )}

            {!showResult && (
              <View style={styles.actionsContainer}>
                <Text style={styles.actionPrompt}>What's your decision?</Text>
                <View style={styles.actionButtons}>
                  <ActionButton
                    title="Fold"
                    onPress={() => handleDecision('fold')}
                    variant="danger"
                    style={styles.actionButton}
                  />
                  <ActionButton
                    title="Call"
                    onPress={() => handleDecision('call')}
                    variant="secondary"
                    style={styles.actionButton}
                  />
                  <ActionButton
                    title="Raise"
                    onPress={() => handleDecision('raise')}
                    variant="primary"
                    style={styles.actionButton}
                  />
                </View>
              </View>
            )}

            {showResult && lastResult && (
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  {lastResult.correct ? (
                    <CheckCircle size={32} color="#10B981" />
                  ) : (
                    <XCircle size={32} color="#EF4444" />
                  )}
                  <View style={styles.resultTitleContainer}>
                    <Text style={[
                      styles.resultTitle,
                      { color: lastResult.correct ? '#10B981' : '#EF4444' }
                    ]}>
                      {lastResult.correct ? 'Correct!' : 'Not Quite'}
                    </Text>
                    <View style={[
                      styles.gradeContainer,
                      { backgroundColor: getGradeColor(lastResult.grade) }
                    ]}>
                      <Text style={styles.gradeText}>{lastResult.grade}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.resultDetails}>
                  <Text style={styles.resultText}>
                    You chose: <Text style={styles.bold}>{lastResult.userAction.toUpperCase()}</Text>
                  </Text>
                  <Text style={styles.resultText}>
                    Best choice: <Text style={styles.bold}>{lastResult.correctAction.toUpperCase()}</Text>
                  </Text>
                  <Text style={styles.resultText}>
                    Hand strength: <Text style={styles.bold}>{lastResult.handStrength.toFixed(0)}%</Text>
                  </Text>
                  <Text style={styles.resultText}>
                    Expected value: <Text style={styles.bold}>${lastResult.expectedValue.toFixed(2)}</Text>
                  </Text>
                </View>

                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationTitle}>Analysis</Text>
                  <Text style={styles.explanationText}>
                    {lastResult.explanation}
                  </Text>
                </View>

                <ActionButton
                  title="Deal Next Hand"
                  onPress={dealNewHandToUser}
                  style={styles.nextButton}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#F9FAFB',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  handContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  handHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  handTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F9FAFB',
  },
  newHandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  newHandText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
    marginLeft: 6,
  },
  gameInfo: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
  },
  situationContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#374151',
  },
  situationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  situationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
    marginRight: 8,
  },
  situationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  cardsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    marginBottom: 12,
  },
  playerCards: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  communityCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionPrompt: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  resultContainer: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultTitleContainer: {
    alignItems: 'center',
    marginLeft: 12,
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  gradeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  gradeText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  resultDetails: {
    marginBottom: 16,
  },
  resultText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    marginBottom: 8,
  },
  bold: {
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
  },
  explanationContainer: {
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 8,
  },
});