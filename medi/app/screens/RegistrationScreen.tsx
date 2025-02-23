import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyButton } from '../EmergencyButton';

export default function RegistrationScreen({ onComplete }: { onComplete: () => void }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState(''); // Add name state

  const handleComplete = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('userName', userName),
        AsyncStorage.setItem('userPhone', phoneNumber)
      ]);
      onComplete();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
  
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
       <EmergencyButton />
      <Text style={{ fontSize: 32, fontWeight: 600, textAlign: 'center', marginTop: 100 }}>Medi</Text>
      <Text style={{ fontSize: 24, fontWeight: '600', textAlign: 'center', marginTop: 100 }}>Create an account</Text>
      <Text style={{ textAlign: 'center', marginTop: 15 }}>Enter your name</Text>
      {/* Add Name Input */}
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 10,
          marginTop: 20,
        }}
        placeholder="Full name"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="words"
      />
      <Text style={{ textAlign: 'center', marginTop: 15 }}>Enter your patient ID</Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 10,
          marginTop: 20,
        }}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
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
    </View>
  );
}

