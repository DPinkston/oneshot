import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import ToggleButton from '../components/TogBut';
import StoryManager from '../components/StoryMan';
import buttonsData from '../components/buttonsData';
import Footer from '../components/Footer';
// import 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Splash() {
  const isDarkMode = useColorScheme() === 'dark';
  const [hiddenButtons, setHiddenButtons] = useState<boolean[]>(buttonsData.map(() => false));
  const [clickedCount, setClickedCount] = useState(0);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [currentPart, setCurrentPart] = useState(0);
  const router = useRouter();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColors.background : '#F3F3F3',
  };

  const handleButtonClick = (index: number) => {
    if (clickedCount >= buttonsData.length) return;

    setHiddenButtons(prevHiddenButtons => {
      const updatedHiddenButtons = [...prevHiddenButtons];
      updatedHiddenButtons[index] = true; 
      return updatedHiddenButtons;
    });
    setClickedCount(prev => prev + 1);
    setCurrentPart(clickedCount);
    setIsStoryVisible(true);
  };

  const closeStoryOverlay = () => setIsStoryVisible(false);


  const resetBubbles = () => {
    setHiddenButtons(buttonsData.map(() => false)); 
    setClickedCount(0);
    setCurrentPart(0);
    setIsStoryVisible(false);
   
  };

  return (
    <SafeAreaView style={[ { flex: 1 }]}>
 <StatusBar barStyle="light-content" backgroundColor="black" />
       <View style={styles.header}>
        <Text style={styles.headerText}>header</Text>
      </View>
      <View style={[styles.mainContainer, { backgroundColor: isDarkMode ? darkColors.card : '#FFFFFF' }]}>
        <Section
          title="Click the Bubbles!"
          buttons={buttonsData}
          hiddenButtons={hiddenButtons}
          onButtonClick={handleButtonClick}
        />
      </View>
      <View style={styles.footer}>
        <Footer onReset={resetBubbles} isVisible={clickedCount >= 9} />
      </View>
      {isStoryVisible && (
        <Modal transparent={true} visible={isStoryVisible}>
          <View style={styles.storyOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={closeStoryOverlay}>
              <Text style={styles.closeButtonText}>X </Text>
            <StoryManager currentPart={currentPart} contactsPermission={false} smsPermission={false}  />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const { height, width } = Dimensions.get('window');

const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  card: '#333333',
  accent: '#BB86FC',
};

type SectionProps = {
  title: string;
  buttons: { id: number; label: string }[]; 
  hiddenButtons: boolean[];
  onButtonClick: (index: number) => void; 
};

function Section({ title, buttons, hiddenButtons, onButtonClick }: SectionProps) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? darkColors.text : '#E0E0E0' }]}>
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
}


const styles = StyleSheet.create({
  sectionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, backgroundColor: "black" },
  sectionTitle: { fontSize: 24, fontWeight: '600' },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  button: { 
    width: 100, 
    height: 100, 
    margin: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BB86FC', 
    borderRadius: 10, 
  },
  hiddenButton: { opacity: 0 }, 
  header: {
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  headerText: { color: 'white', fontSize: 20 },
  mainContainer: { flex: 1 ,backgroundColor:'black'},
  footer: { flexDirection: 'row', padding: 20, backgroundColor: 'black', alignItems: 'center' },
  resetButtonFooter: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'gray', borderRadius: 10 },
  resetButtonText: { color: 'white', fontSize: 16 },
  storyOverlay: { flex:1, top: 0, left: 0, width, height, backgroundColor: 'black', padding: 20 },
  closeButton: { position: 'absolute', top: 20, right: 20, padding: 10 },
  closeButtonText: { color: 'white', fontSize: 50, fontWeight: 'bold' },
});

