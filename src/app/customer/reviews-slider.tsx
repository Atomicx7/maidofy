import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const reviews = [
  {
    id: '1',
    name: 'John D.',
    rating: 5,
    text: 'Excellent service! Very professional and thorough.',
  },
  {
    id: '2',
    name: 'Sarah M.',
    rating: 5,
    text: 'Best cleaning service Ive ever used. Highly recommended!',
  },
  {
    id: '3',
    name: 'Mike R.',
    rating: 4,
    text: 'Great attention to detail and friendly staff.',
  },
];

export const ReviewsSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -width * (reviews.length - 1),
          duration: 15000,
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
                transform: [
                  {
                    translateX: Animated.add(scrollX, width * index),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.reviewName}>{review.name}</Text>
            <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
            <Text style={styles.reviewText}>{review.text}</Text>
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
    width: width - 40,
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    padding: 16,
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

