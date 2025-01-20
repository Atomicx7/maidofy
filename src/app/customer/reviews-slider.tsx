import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

const reviews = [
  {
    id: '1',
    name: 'Amit',
    rating: 5,
    text: 'Excellent service! Very professional and thorough.',
  },
  {
    id: '2',
    name: 'Sonu',
    rating: 5,
    text: 'Best cleaning service Ive ever used. Highly recommended!',
  },
  {
    id: '3',
    name: 'Ojas Mehta',
    rating: 4,
    text: 'Great attention to detail and friendly staff.',
  },
];

export const ReviewsSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const scrollAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -width * (reviews.length - 1),
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    scrollAnimation.start();

    return () => scrollAnimation.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Our Customers Say</Text>
      <View style={styles.sliderContainer}>
        {reviews.map((review, index) => (
          <Animated.View
            key={review.id}
            style={[
              styles.reviewCard,
              { 
                backgroundColor: isDark ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              {
                transform: [
                  {
                    translateX: Animated.add(scrollX, width * index),
                  },
                ],
              },
            ]}
          >
            <Text style={[styles.reviewName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              {review.name}
            </Text>
            <Text style={[styles.reviewRating, { color: isDark ? '#FFD700' : '#FF9800' }]}>
              {'★'.repeat(review.rating)}
            </Text>
            <Text style={[styles.reviewText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              {review.text}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sliderContainer: {
    height: 150,
    overflow: 'hidden',
  },
  reviewCard: {
    position: 'absolute',
    height: 110,
    // width: width - 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingStart: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 14,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
});

