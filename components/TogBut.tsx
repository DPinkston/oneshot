import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ToggleButtonProps {
  number: number;
  label: string;
  isActive: boolean;
  countdown: number | null;
  onClick: () => void;
  disabled: boolean;
  style?: ViewStyle;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  number,
  label,
  isActive,
  countdown,
  onClick,
  disabled,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    disabled && styles.disabled,
    isActive && styles.active,
    style,
  ];

  const displayText = isActive && countdown !== null ? `${countdown}s` : label;

  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={buttonStyle}
      accessible={true}
      accessibilityLabel={`Button ${number}`}
      accessibilityHint={
        disabled
          ? "Button is currently disabled"
          : "Tap to initiate countdown or activate the button"
      }
    >
      <Text style={[styles.buttonText, isActive && styles.activeText]}>
        {displayText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
  },
  buttonText: {
    color: '#e0e0e0',
    fontSize: 16,
  },
  active: {
    backgroundColor: 'rgba(0, 255, 204, 0.7)',
  },
  disabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ToggleButton;
