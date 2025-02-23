import { StyleSheet, Image, Platform } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmergencyButton } from '../EmergencyButton';

export default function TabThreeScreen() {
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const [name, email, phone] = await Promise.all([
          AsyncStorage.getItem('userName'),
          AsyncStorage.getItem('userEmail'),
          AsyncStorage.getItem('userPhone')
        ]);
        
        setPatientData({
          name: name || 'Not provided',
          email: email || 'Not provided',
          phone: phone || 'Not provided'
        });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadPatientData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <FontAwesome6 name="face-smile" size={310} color="#D0D0D0" />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedText>This page displays patient data which is only changeable by your primary care suppliers. Contact your doctor if anything needs to be changed</ThemedText>

      <Collapsible title="Patient Name">
        <ThemedText>
          {patientData.name}
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Patient ID">
        <ThemedText>
          {patientData.phone}
        </ThemedText>
      </Collapsible>
      <Collapsible title="Patient Email">
        <ThemedText>
          {patientData.email}
        </ThemedText>
      </Collapsible>

      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
