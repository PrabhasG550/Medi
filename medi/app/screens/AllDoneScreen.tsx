import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { EmergencyButton } from '../EmergencyButton';

export default function AllDoneScreen({ onComplete }: { onComplete: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    // Initial entrance animation
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
    ]).start();

    // Exit animation after delay
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onComplete());
    }, 1500);
  }, []);

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
        All Done :)
      </Animated.Text>
    </View>
  );
}