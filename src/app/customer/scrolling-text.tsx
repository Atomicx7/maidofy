import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet, Dimensions, useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

export const ScrollingText = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
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
    <View style={[styles.container,{ backgroundColor: isDark ? '#121212' : '#fff'}]}>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ translateX: scrollAnim }],
             color: isDark ? '#FFFFFF' : '#333333'
          }
        ]}
      >
        More features adding soon • Stay tuned • More features adding soon • Stay tuned • More features adding soon • Stay tuned • More features adding soon
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
    marginTop: 18,
    // borderRadius: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF9800',
    paddingVertical: 5,
  },
});

