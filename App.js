import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, Animated } from 'react-native';

export default function App() {
  const [diceNumber, setDiceNumber] = useState(1);
  const [rolling, setRolling] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    setRolling(true);
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      const finalNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(finalNumber);
      setRolling(false);
      rotationAnim.setValue(0);  // Reset the animation for the next roll
    });

    // Simulate rolling by quickly cycling through random numbers
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(randomNum);
    }, 100);

    // Stop the cycling when the animation ends
    setTimeout(() => {
      clearInterval(interval);
    }, 1000);
  };

  const diceImages = {
    1: require('./assets/images/dice1.png'),
    2: require('./assets/images/dice2.png'),
    3: require('./assets/images/dice3.png'),
    4: require('./assets/images/dice4.png'),
    5: require('./assets/images/dice5.png'),
    6: require('./assets/images/dice6.png'),
  };

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text>Roll the Dice!</Text>
      <Animated.Image
        source={diceImages[diceNumber]}
        style={[styles.diceImage, { transform: [{ rotate: spin }] }]}
      />
      <Button title="Roll Dice" onPress={!rolling ? rollDice : null} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceImage: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
