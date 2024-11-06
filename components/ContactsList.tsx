import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

interface ContactListProps {
  onSelectContact: (contact: any) => Promise<void>;
  onClose: () => void;
}

const { height, width } = Dimensions.get('window');

const ContactList: React.FC<ContactListProps> = ({ onSelectContact, onClose }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactsPermission, setContactsPermission] = useState<boolean>(false);
  const [smsAvailable, setSmsAvailable] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null); // State for selected contact
  const [customMessage, setCustomMessage] = useState<string>(''); // State for custom message

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: contactsStatus } = await Contacts.requestPermissionsAsync();
      const smsStatus = await SMS.isAvailableAsync();

      setContactsPermission(contactsStatus === 'granted');
      setSmsAvailable(smsStatus);

      if (contactsStatus !== 'granted' || !smsStatus) {
        Alert.alert(
          "Permission Required",
          "This app needs access to your contacts and SMS to function properly. Please allow access.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => {} },
            { text: "Ask Later", onPress: () => {} }
          ]
        );
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (contactsPermission) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    };

    fetchContacts();
  }, [contactsPermission]);

  const sendSms = async () => {
    if (smsAvailable && selectedContact) {
      const messageBody = `${customMessage}\nHere's your link: YourAppLinkHere`; // Combine custom message and link
      const { result } = await SMS.sendSMSAsync(
        [selectedContact.phoneNumbers[0]?.number],
        messageBody
      );

      if (result === 'sent') {
        Alert.alert('SMS sent!', `Message sent to ${selectedContact.name}.`);
      } else if (result === 'cancelled') {
        Alert.alert('SMS cancelled', `Message sending was cancelled.`);
      } else {
        Alert.alert('Thank You!!!');
      }

      // Reset the selected contact and message input
      setSelectedContact(null);
      setCustomMessage('');
    } else {
      Alert.alert("SMS is not available", "Cannot send SMS from this device.");
    }
  };

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Select a Contact</Text>

      {selectedContact ? ( // Show selected contact details
        <View style={styles.selectedContactContainer}>
          <Text style={styles.selectedContactName}>{selectedContact.name}</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Click to edit your message here..."
            placeholderTextColor="#FFFFFF"
            value={customMessage}
            onChangeText={setCustomMessage}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendSms}>
            <Text style={styles.sendButtonText}>Send SMS</Text>
          </TouchableOpacity>
        </View>
      ) : (
        contactsPermission ? (
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => handleContactSelect(item)} // Select contact
              >
                <Text style={styles.contactName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.errorText}>No access to contacts</Text>
        )
      )}
      
      {smsAvailable ? (
        <Text style={styles.smsStatus}></Text>
      ) : (
        <Text style={styles.smsStatus}>SMS is not available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    padding: 20,
    paddingBottom: 0,
    right: 25,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00ffcc',
    marginBottom: 20,
    fontFamily: 'sans-serif-condensed',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 35,
    padding: 10,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    fontSize: 28,
    color: 'white',
  },
  contactButton: {
    backgroundColor: '#00ffcc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  contactName: {
    color: 'black',
    fontSize: 28,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 18,
  },
  smsStatus: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  selectedContactContainer: {
    alignItems: 'center',
  },
  selectedContactName: {
    fontSize: 24,
    color: '#00ffcc',
    marginBottom: 10,
  },
  messageInput: {
    width: '100%',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: '#00ffcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ContactList;
