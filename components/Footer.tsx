// components/Footer.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


interface FooterProps {
  onReset: () => void;
  isVisible: boolean; // New prop to control visibility
}

const Footer: React.FC<FooterProps> = ({ onReset, isVisible }) => {
  if (!isVisible) return null; // Hide the button if not visible

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.resetButtonFooter} onPress={onReset}>
        <Text style={styles.resetButtonText}>Reset Bubbles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { flex: 1, padding: 20, backgroundColor: 'black', alignItems: 'center' },
  resetButtonFooter: {     backgroundColor: '#00ffcc', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    margin: 10,},
  resetButtonText: { color: 'black', fontSize: 28 },
});

export default Footer;
