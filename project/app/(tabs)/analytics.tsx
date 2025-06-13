import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import StatsCard from '@/components/StatsCard';
import { TrendingUp, Target, Award, Clock, ChartBar as BarChart3, Percent } from 'lucide-react-native';

export default function AnalyticsScreen() {
  // Mock data - in a real app, this would come from a database
  const stats = {
    totalHands: 127,
    accuracy: 73.2,
    averageEV: 2.45,
    streak: 8,
    bestStreak: 15,
    timeSpent: 45, // minutes
    level: 12,
    experience: 2340
  };

  const recentPerformance = [
    { date: '2025-01-20', accuracy: 80, hands: 12 },
    { date: '2025-01-19', accuracy: 75, hands: 8 },
    { date: '2025-01-18', accuracy: 70, hands: 15 },
    { date: '2025-01-17', accuracy: 85, hands: 10 },
    { date: '2025-01-16', accuracy: 65, hands: 9 },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 15, percentage: 12 },
    { grade: 'A', count: 22, percentage: 17 },
    { grade: 'B+', count: 28, percentage: 22 },
    { grade: 'B', count: 25, percentage: 20 },
    { grade: 'C+', count: 18, percentage: 14 },
    { grade: 'C', count: 12, percentage: 9 },
    { grade: 'D', count: 5, percentage: 4 },
    { grade: 'F', count: 2, percentage: 2 },
  ];

  const positionStats = [
    { position: 'Button', accuracy: 82, hands: 25 },
    { position: 'Cutoff', accuracy: 78, hands: 22 },
    { position: 'Big Blind', accuracy: 68, hands: 28 },
    { position: 'Small Blind', accuracy: 65, hands: 20 },
    { position: 'Under the Gun', accuracy: 71, hands: 18 },
    { position: 'Middle Position', accuracy: 74, hands: 14 },
  ];

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
          <TrendingUp size={28} color="#3B82F6" />
          <Text style={styles.title}>Your Progress</Text>
        </View>
        <Text style={styles.subtitle}>
          See how you're improving
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Stats */}
        <Text style={styles.sectionTitle}>Overall Stats</Text>
        <View style={styles.statsGrid}>
          <StatsCard
            title="Hands Played"
            value={stats.totalHands}
            icon={<BarChart3 size={20} color="#3B82F6" />}
            color="#3B82F6"
          />
          <StatsCard
            title="Correct Choices"
            value={`${stats.accuracy}%`}
            icon={<Target size={20} color="#10B981" />}
            color="#10B981"
          />
        </View>

        <View style={styles.statsGrid}>
          <StatsCard
            title="Avg Profit"
            value={`$${stats.averageEV}`}
            subtitle="per hand"
            icon={<TrendingUp size={20} color="#F59E0B" />}
            color="#F59E0B"
          />
          <StatsCard
            title="Win Streak"
            value={stats.streak}
            subtitle={`Best: ${stats.bestStreak}`}
            icon={<Award size={20} color="#EF4444" />}
            color="#EF4444"
          />
        </View>

        <View style={styles.statsGrid}>
          <StatsCard
            title="Practice Time"
            value={`${stats.timeSpent}m`}
            subtitle="this week"
            icon={<Clock size={20} color="#8B5CF6" />}
            color="#8B5CF6"
          />
          <StatsCard
            title="Level"
            value={stats.level}
            subtitle={`${stats.experience} XP`}
            icon={<Award size={20} color="#06B6D4" />}
            color="#06B6D4"
          />
        </View>

        {/* Grade Distribution */}
        <Text style={styles.sectionTitle}>Grade Distribution</Text>
        <View style={styles.gradeContainer}>
          {gradeDistribution.map((item, index) => (
            <View key={index} style={styles.gradeRow}>
              <View style={styles.gradeInfo}>
                <View style={[
                  styles.gradeBadge,
                  { backgroundColor: getGradeColor(item.grade) }
                ]}>
                  <Text style={styles.gradeBadgeText}>{item.grade}</Text>
                </View>
                <Text style={styles.gradeCount}>{item.count} hands</Text>
              </View>
              <View style={styles.gradeBarContainer}>
                <View style={[
                  styles.gradeBar,
                  { 
                    width: `${item.percentage}%`,
                    backgroundColor: getGradeColor(item.grade)
                  }
                ]} />
              </View>
              <Text style={styles.gradePercentage}>{item.percentage}%</Text>
            </View>
          ))}
        </View>

        {/* Position Performance */}
        <Text style={styles.sectionTitle}>Performance by Position</Text>
        <View style={styles.positionContainer}>
          {positionStats.map((position, index) => (
            <View key={index} style={styles.positionRow}>
              <View style={styles.positionInfo}>
                <Text style={styles.positionName}>{position.position}</Text>
                <Text style={styles.positionHands}>
                  {position.hands} hands
                </Text>
              </View>
              <View style={styles.positionAccuracy}>
                <Text style={styles.positionPercentage}>
                  {position.accuracy}%
                </Text>
                <View style={styles.positionBarContainer}>
                  <View style={[
                    styles.positionBar,
                    { 
                      width: `${position.accuracy}%`,
                      backgroundColor: position.accuracy >= 75 ? '#10B981' : 
                                     position.accuracy >= 65 ? '#F59E0B' : '#EF4444'
                    }
                  ]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Performance */}
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        <View style={styles.performanceContainer}>
          {recentPerformance.map((day, index) => (
            <View key={index} style={styles.performanceRow}>
              <View style={styles.performanceDate}>
                <Text style={styles.dateText}>
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
              <View style={styles.performanceStats}>
                <View style={styles.performanceStat}>
                  <Text style={styles.performanceValue}>{day.accuracy}%</Text>
                  <Text style={styles.performanceLabel}>Correct</Text>
                </View>
                <View style={styles.performanceStat}>
                  <Text style={styles.performanceValue}>{day.hands}</Text>
                  <Text style={styles.performanceLabel}>Hands</Text>
                </View>
              </View>
              <View style={[
                styles.performanceBar,
                { width: `${day.accuracy}%` }
              ]} />
            </View>
          ))}
        </View>

        {/* Progress Insights */}
        <Text style={styles.sectionTitle}>Tips for You</Text>
        <View style={styles.insightsContainer}>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🎯 Your Strength</Text>
            <Text style={styles.insightText}>
              You play best from the Button position with 82% accuracy. Use position to your advantage!
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>📈 Work On This</Text>
            <Text style={styles.insightText}>
              Focus on Small Blind play. Your 65% accuracy from this position has room for improvement.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🔥 Hot Streak</Text>
            <Text style={styles.insightText}>
              You're on an 8-hand winning streak! You're 7 hands away from your personal best.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  gradeContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#374151',
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  gradeBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  gradeCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  gradeBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  gradeBar: {
    height: 8,
    borderRadius: 4,
  },
  gradePercentage: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    width: 35,
    textAlign: 'right',
  },
  positionContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#374151',
  },
  positionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  positionInfo: {
    flex: 1,
  },
  positionName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
  },
  positionHands: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  positionAccuracy: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  positionPercentage: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  positionBarContainer: {
    width: 60,
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  positionBar: {
    height: 4,
    borderRadius: 2,
  },
  performanceContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#374151',
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  performanceDate: {
    width: 60,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  performanceStats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  performanceStat: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#F9FAFB',
  },
  performanceLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  performanceBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#3B82F6',
    borderRadius: 1,
  },
  insightsContainer: {
    marginBottom: 32,
  },
  insightCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    lineHeight: 20,
  },
});