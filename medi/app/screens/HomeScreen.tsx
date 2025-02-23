import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Linking,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeScreenProps {
  onNavigateToJournal: () => void;
}

export default function HomeScreen({ onNavigateToJournal }: HomeScreenProps) {
  const [userName, setUserName] = useState('');

  const reminders = [
    'Take Advil 30 mins after breakfast',
    'Take water break by 2:30 PM',
    'Lunch at 3 PM',
  ];

  // State to track toggle status for each reminder
  const [pressedReminders, setPressedReminders] = useState<boolean[]>(
    reminders.map(() => false)
  );

  // Customization state for colors
  const [customBackgroundColor, setCustomBackgroundColor] = useState('#ADD8E6');
  const [customPressedColor, setCustomPressedColor] = useState('#9CC2CF');
  const [customizationVisible, setCustomizationVisible] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.log('Error retrieving user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleEmergencyPress = () => {
    Linking.openURL('tel:5551234567');
  };

  // Toggle the pressed state for a reminder
  const handleReminderPress = (index: number) => {
    const newPressed = [...pressedReminders];
    newPressed[index] = !newPressed[index];
    setPressedReminders(newPressed);
  };

  return (
    <View style={[styles.container, { backgroundColor: customBackgroundColor }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.welcomeText}>
          Welcome, {'\n'} {userName ? `${userName}` : ''}
        </Text>
        <Pressable onPress={handleEmergencyPress} style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Emergency</Text>
        </Pressable>
      </View>

      {/* Reminders Section */}
      <View style={styles.remindersContainer}>
        <Text style={styles.sectionTitle}>Your Reminders</Text>
        {reminders.map((reminder, index) => (
          <Pressable
            key={index}
            style={[
              styles.reminderItem,
              pressedReminders[index] && { backgroundColor: customPressedColor },
            ]}
            onPress={() => handleReminderPress(index)}
          >
            <Text style={styles.reminderText}>{reminder}</Text>
          </Pressable>
        ))}
      </View>

      {/* Journal Card */}
      <Pressable style={styles.journalContainer} onPress={onNavigateToJournal}>
        <Text style={styles.journalTitle}>Journal</Text>
        <Text style={styles.journalSubtitle}>
          Write down what you are thinking and feeling
        </Text>
      </Pressable>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '600',
  },
  emergencyButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  remindersContainer: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 10,
  },
  reminderItem: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 16,
  },
  journalContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#EAEAEA',
    height: 115,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  journalTitle: {
    fontSize: 32,
    fontWeight: '600',
  },
  journalSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
});
