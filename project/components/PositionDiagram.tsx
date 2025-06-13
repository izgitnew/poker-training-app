import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PositionDiagramProps {
  currentPosition: string;
}

export default function PositionDiagram({ currentPosition }: PositionDiagramProps) {
  const positions = [
    { name: 'Small Blind', short: 'SB', angle: 0 },
    { name: 'Big Blind', short: 'BB', angle: 45 },
    { name: 'Under the Gun', short: 'UTG', angle: 90 },
    { name: 'Middle Position', short: 'MP', angle: 135 },
    { name: 'Cutoff', short: 'CO', angle: 180 },
    { name: 'Button', short: 'BTN', angle: 225 }
  ];

  const isCurrentPosition = (position: string) => {
    return position === currentPosition;
  };

  // Dealer position - positioned between Button and Small Blind
  const dealerAngle = 315; // 45 degrees clockwise from Button (225 + 90)
  const radius = 80;
  const dealerAngleRad = (dealerAngle * Math.PI) / 180;
  const dealerX = Math.cos(dealerAngleRad) * radius;
  const dealerY = Math.sin(dealerAngleRad) * radius;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Position</Text>
      <View style={styles.table}>
        <View style={styles.tableCenter}>
          <Text style={styles.tableCenterText}>POKER{'\n'}TABLE</Text>
        </View>
        
        {/* Dealer Position */}
        <View style={[
          styles.dealerPosition,
          {
            transform: [
              { translateX: dealerX },
              { translateY: dealerY }
            ]
          }
        ]}>
          <View style={styles.dealerChip}>
            <Text style={styles.dealerText}>D</Text>
          </View>
        </View>
        
        {positions.map((position, index) => {
          const isCurrent = isCurrentPosition(position.name);
          const angleRad = (position.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;
          
          return (
            <View
              key={position.name}
              style={[
                styles.positionSeat,
                {
                  transform: [
                    { translateX: x },
                    { translateY: y }
                  ]
                },
                isCurrent && styles.currentPosition
              ]}
            >
              <Text style={[
                styles.positionText,
                isCurrent && styles.currentPositionText
              ]}>
                {position.short}
              </Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.positionInfo}>
        <Text style={styles.positionLabel}>Your Position:</Text>
        <Text style={styles.positionName}>{currentPosition}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  table: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tableCenter: {
    width: 80,
    height: 50,
    backgroundColor: '#059669',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  tableCenterText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 12,
  },
  dealerPosition: {
    position: 'absolute',
    alignItems: 'center',
  },
  dealerChip: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FBBF24',
    shadowColor: '#F59E0B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  dealerText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  positionSeat: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6B7280',
  },
  currentPosition: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  positionText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#9CA3AF',
  },
  currentPositionText: {
    color: '#FFFFFF',
  },
  positionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  positionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginRight: 8,
  },
  positionName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
  },
});