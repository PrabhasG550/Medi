import React from 'react';
import { Pressable, Text, Linking } from 'react-native';

export const EmergencyButton = () => (
  <Pressable
    onPress={() => Linking.openURL('tel:5551234567')}
    style={{
      position: 'absolute',
      top: 60,
      right: 20,
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
      zIndex: 1000, // Ensure the button stays on top
    }}
  >
    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Emergency</Text>
  </Pressable>
);
