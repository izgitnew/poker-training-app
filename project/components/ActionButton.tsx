import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function ActionButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style 
}: ActionButtonProps) {
  const getButtonStyle = () => {
    if (disabled) return styles.disabled;
    
    switch (variant) {
      case 'primary': return styles.primary;
      case 'secondary': return styles.secondary;
      case 'danger': return styles.danger;
      default: return styles.primary;
    }
  };

  const getTextStyle = () => {
    if (disabled) return styles.disabledText;
    
    switch (variant) {
      case 'primary': return styles.primaryText;
      case 'secondary': return styles.secondaryText;
      case 'danger': return styles.dangerText;
      default: return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, getTextStyle()]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  primary: {
    backgroundColor: '#3B82F6',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondary: {
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  secondaryText: {
    color: '#F9FAFB',
  },
  danger: {
    backgroundColor: '#EF4444',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  disabled: {
    backgroundColor: '#374151',
  },
  disabledText: {
    color: '#6B7280',
  },
});