import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const ScrollingText = () => {
  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: -width,
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(scrollAnim, {
          toValue: width,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ translateX: scrollAnim }]
          }
        ]}
      >
        More features adding soon • Stay tuned • More features adding soon • Stay tuned •
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
    marginTop: 8,
    borderRadius: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF9800',
    paddingVertical: 5,
  },
});

