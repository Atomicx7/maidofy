import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const slideShowImages = [
  require('../../assets/images/adaptive-icon.png'),
  require('../../assets/images/captain.png'),
  require('../../assets/images/customer.png'),
];

const upcomingFeatures = [
  { id: '1', title: 'Laundry' },
  { id: '2', title: 'Gardening' },
  { id: '3', title: 'Pet Care' },
];

const Home = () => {
  const [greeting, setGreeting] = useState('Good morning');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting('Good morning');
      else if (hour >= 12 && hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, Sarah</Text>
            <Text style={styles.location}>New York, NY</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon}>
            <Icon name="person-circle-outline" size={40} color="#FF9800" />
          </TouchableOpacity>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Professional Cleaning Services</Text>
          <Text style={styles.featureDescription}>
            Book experienced and vetted house cleaners at the best prices.
          </Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.slideshow}>
          <FlatList
            data={slideShowImages}
            renderItem={({ item }) => (
              <Image source={item} style={styles.slideImage} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentSlide(slideIndex);
            }}
          />
          <View style={styles.pagination}>
            {slideShowImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentSlide && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <View style={styles.upcomingFeatures}>
          {upcomingFeatures.map((feature) => (
            <View key={feature.id} style={styles.upcomingFeatureCard}>
              <Text style={styles.upcomingFeatureTitle}>{feature.title}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>About Our App</Text>
        <Text style={styles.appDescription}>
          Our app connects you with professional house cleaning services,
          ensuring your home stays spotless. With easy booking, secure payments,
          and quality assurance, we make maintaining a clean home effortless.
        </Text>
      </ScrollView>

      <View style={styles.bottomDock}>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="home-outline" size={24} color="#FF9800" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="time-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="wallet-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="settings-outline" size={24} color="#757575" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  location: {
    fontSize: 16,
    color: '#757575',
  },
  profileIcon: {
    padding: 5,
  },
  featureCard: {
    backgroundColor: '#FF9800',
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#FF9800',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slideshow: {
    height: 200,
    marginBottom: 20,
  },
  slideImage: {
    width,
    height: 200,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  upcomingFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  upcomingFeatureCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    width: width / 3 - 20,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingFeatureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  appDescription: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 100, // Add some bottom margin to account for the floating dock
  },
  bottomDock: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dockItem: {
    padding: 10,
  },
});

export default Home;

