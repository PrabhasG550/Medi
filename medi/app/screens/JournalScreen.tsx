import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyButton } from '../EmergencyButton';

interface JournalEntry {
  id: string;
  text: string;
  dateTime: string;
}

interface JournalScreenProps {
  onBack: () => void;
}

export default function JournalScreen({ onBack }: JournalScreenProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');

  // 1. Load existing entries from AsyncStorage on mount
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const storedEntries = await AsyncStorage.getItem('journalEntries');
        if (storedEntries) {
          // Parse JSON into an array of JournalEntry objects
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.log('Error loading journal entries:', error);
      }
    };
    loadEntries();
  }, []);

  // 2. Helper function to save current entries to AsyncStorage
  const saveEntriesToStorage = async (updatedEntries: JournalEntry[]) => {
    try {
      await AsyncStorage.setItem(
        'journalEntries',
        JSON.stringify(updatedEntries)
      );
    } catch (error) {
      console.log('Error saving journal entries:', error);
    }
  };

  // 3. Add a new entry with date/time
  const addEntry = async () => {
    if (newEntry.trim().length > 0) {
      const newId = Date.now().toString(); // Unique ID
      const currentDateTime = new Date().toLocaleString(); 
      const entry: JournalEntry = {
        id: newId,
        text: newEntry.trim(),
        dateTime: currentDateTime,
      };

      const updatedEntries = [...entries, entry];
      setEntries(updatedEntries);
      setNewEntry('');

      // Save to AsyncStorage
      await saveEntriesToStorage(updatedEntries);
    }
  };

  return (

    <View style={styles.container}>
        <EmergencyButton/>
      {/* Back button to return to Home */}
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>

      <Text style={styles.header}>Journal</Text>

      {/* List of past entries */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            {/* Date/Time Display */}
            <Text style={styles.entryDateTime}>{item.dateTime}</Text>
            {/* Entry Text */}
            <Text style={styles.entryText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input to add new entry */}
      <TextInput
        style={styles.input}
        placeholder="Write a new journal entry..."
        value={newEntry}
        onChangeText={setNewEntry}
        multiline
      />

      <Pressable style={styles.addButton} onPress={addEntry}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
    marginTop: 50
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  entryContainer: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  entryDateTime: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  entryText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 50,
    minHeight: 300,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: 'black',
    marginBottom: 100,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
