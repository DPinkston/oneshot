import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import StoryManager from './StoryMan'; 

interface StoryOverlayProps {
  visible: boolean;
  onClose: () => void;
  currentPart: number;
  contactsPermission: boolean;
  smsPermission: boolean;
  storyParts:string[];
}

const StoryOverlay: React.FC<StoryOverlayProps> = ({ visible, onClose, currentPart, contactsPermission, smsPermission,storyParts }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide"> 
      <View style={styles.storyOverlay}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <StoryManager 
                  currentPart={currentPart}
                  contactsPermission={contactsPermission}
                  smsPermission={smsPermission}  /> 
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  storyOverlay: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40, 
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 28, 
    fontWeight: 'bold',
  },
});

export default StoryOverlay;
