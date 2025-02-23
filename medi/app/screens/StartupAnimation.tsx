import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { EmergencyButton } from '../EmergencyButton';
export default function StartupAnimation({ onComplete }: { onComplete: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Initial entrance animation
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
    ]).start();

    // Exit animation after delay
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: -283,
          useNativeDriver: true,
          damping: 15,
          stiffness: 150,
        }),
      ]).start(() => onComplete());
    }, 1500);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

      <EmergencyButton />
      <Animated.Text
        style={{
          fontSize: 32,
          fontWeight: '600',
          opacity: fadeAnim,
          transform: [
            { translateY },
            { scale }
          ],
        }}
      >
        Medi
      </Animated.Text>
    </View>
  );
}