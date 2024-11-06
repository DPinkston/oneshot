import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import ContactList from '../components/ContactsList';

let initialStoryParts: string[]  = [
  "Thank you for starting this journey. Each line you reach, each ad you watch, means more than you know...",
  "By sticking with us through each ad, you're helping bring change, little by little, line by line...",
  "Every second you spend here isn’t just for you—it's helping make a difference, creating hope...",
  "You've watched ads before—TV shows, videos—small pauses that can lead to something bigger...",
  "Here, each ad is a step toward a positive impact, toward helping those who need it most...",
  "Your patience and support are proof that even the smallest actions can create waves...",
  "One more ad, one more moment—it all counts. Your journey here is a gift to someone else...",
  "You made it! Your time here has truly helped. Thank you for watching, for caring, and for making a difference.",
];

type StoryManagerProps = {
  currentPart: number;
  contactsPermission: boolean;
  smsPermission: boolean;
};


const StoryManager: React.FC<StoryManagerProps> = ({ currentPart }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [storyParts, setStoryParts] = useState<string[]>(initialStoryParts);
  const [numberOfClicks, setnumberOfClicks] =  useState(0);



  useEffect(()=> {

      
     if (currentPart == 8 ) {
      console.log("part limit reaach")
      const fetchAndSetJokes = async () => {
        const jokes = await fetchDadJokes();
        initialStoryParts =  jokes;

      };
      fetchAndSetJokes();
    }
  }, [numberOfClicks]); 

  const fetchDadJokes = async (): Promise<string[]> => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/ten');
      const jokes = await response.json();
  
      // Return the first 8 jokes formatted as strings
      return jokes.slice(0, 8).map((joke: { setup: string; punchline: string }) => `${joke.setup} ${joke.punchline}`);
    } catch (error) {
      console.error('Error fetching dad jokes:', error);
      return [];
    }
  };
  
  return (
    <View style={styles.storyContainer}>
      {currentPart < storyParts.length ? (
        <Text style={styles.storyText}>{storyParts[currentPart]}</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.storyText}>
            The end! Thank you for reading!  If you want some jokes,  Click Reset Bubbles on next screen!!!.........enjoy!!  Please share the app to help support.  That is the only way to help support my dreams of reaching one million people. 
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Share with Friends</Text>
          </TouchableOpacity>
          <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <ContactList 
                onClose={() => setModalVisible(false)} 
                onSelectContact={function (contact: any): Promise<void> {
                  throw new Error('Function not implemented.');
                }} 
              />
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  storyText: { color: 'lightgray', fontSize: 25, textAlign: 'center', margin: 10 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: 'black' },
  closeButton: { position: 'absolute', top: 20, right: 20 },
  closeButtonText: { fontSize: 28, fontWeight: 'bold', color: 'black' },
  button: {
    backgroundColor: '#00ffcc', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    margin: 10, 
  },
  buttonText: {
    color: '#000', 
    fontSize: 28, 
    fontWeight: 'bold', 
  },
});

export default StoryManager;
