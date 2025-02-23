import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { Animated, Pressable, Linking } from 'react-native';
import { EmergencyButton } from '../EmergencyButton';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Transition to home screen after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleEmergencyPress = () => {
      Linking.openURL('tel:5551234567');
    };

  return (
    
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <EmergencyButton/>
      <Animated.Text
        style={{
          fontSize: 32,
          fontWeight: '600',
          opacity: fadeAnim,
        }}
      >
        Welcome
      </Animated.Text>

    </View>

    
  );
}
