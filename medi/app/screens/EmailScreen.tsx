import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyButton } from '../EmergencyButton';

export default function EmailScreen({ onComplete, onSkip }: { onComplete: () => void, onSkip: () => void }) {
  const [email, setEmail] = useState('');
  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      onComplete();
    } catch (error) {
      console.error('Error saving email:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <EmergencyButton/>
      <Text style={{ fontSize: 32, fontWeight: 600, textAlign: 'center', marginTop: 100 }}>Medi</Text>
      <Text style={{ fontWeight: '600', textAlign: 'center', marginTop: 150 }}>Create an account</Text>
      <Text style={{ textAlign: 'center', marginTop: 15 }}>Enter email address for verification</Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 10,
          marginTop: 20,
        }}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Pressable
        onPress={handleComplete}
        style={{
          backgroundColor: 'black',
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Continue</Text>
      </Pressable>
      <Pressable onPress={onSkip}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Skip</Text>
      </Pressable>
    </View>
  );
}