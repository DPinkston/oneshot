// components/Section.tsx
import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import ToggleButton from './TogBut'; // Adjust the import path as necessary
import buttonsData from './buttonsData';

const darkColors = {
  text: '#FFFFFF',
};

interface SectionProps {
  title: string;
  buttons: typeof buttonsData; // Adjust type based on your buttonsData structure
  hiddenButtons: boolean[];
  onButtonClick: (index: number) => void;
}

const Section: React.FC<SectionProps> = ({ title, buttons, hiddenButtons, onButtonClick }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: isDarkMode ? darkColors.text : '#000000' }]}>
        {title}
      </Text>
      <View style={styles.gridWrapper}>
        {buttons.map((item, index) => (
          <ToggleButton
            key={item.id}
            number={item.id}
            label={item.label}
            onClick={() => onButtonClick(index)}
            disabled={hiddenButtons[index]}
            style={hiddenButtons[index] ? styles.hiddenButton : undefined}
            isActive={false}
            countdown={null}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  sectionTitle: { fontSize: 24, fontWeight: '600' },
  gridWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 10 },
  hiddenButton: { opacity: 0 },
});

export default Section;
