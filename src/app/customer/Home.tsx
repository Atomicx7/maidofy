import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollingText } from './scrolling-text';
import { ReviewsSlider } from './reviews-slider';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const upcomingFeatures = [
  { id: '1', title: 'Subscription' },
  { id: '2', title: 'Gardening' },
  { id: '3', title: 'Pet Care' },
];

const availableServices = [
  { id: '1', title: 'Mopping', icon: 'sparkles-outline' },
  { id: '2', title: 'Brooming', icon: 'scan-outline' },
  { id: '3', title: 'Kitchen', icon: 'fast-food-outline' },
  { id: '4', title: 'Bathroom', icon: 'water-outline' },
  { id: '5', title: 'Ironing', icon: 'shirt-outline' },
  { id: '6', title: 'Dusting', icon: 'leaf-outline' },
];

const Home = () => {
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting('Good morning');
      else if (hour >= 12 && hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

<View style={styles.container}> 
  <StatusBar 
barStyle="dark-content" 
backgroundColor="#f3f3e9" /> </View> 

  const handleNavigate = async () => {
    router.push('/customer/History');
  };
  const handleNavigateWallet = async () => {
    router.push('/customer/Wallet');
  };
  const handleNavigateSettings = async () => {
    router.push('/customer/Settings');
  };
  const handleNavigateBook = async () => {
    router.push('/customer/Book');
  };
  const handleNavigateProfile = async () => {
    router.push('/customer/Profile');
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <View style={styles.brandContainer}>
            <Image 
              source={require('../../assets/icons/coupon.png')} 
              style={styles.logo} 
            />
            <Text style={styles.appName}>ProtoX</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon}  onPress={handleNavigateProfile}>
            <Icon name="person-circle-outline" size={56} color="#555555" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBottom}>
          <Text style={styles.greeting}>{greeting}, Sir</Text>
          <Text style={styles.location}>New York, NY</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Professional Cleaning Services</Text>
          <Text style={styles.featureDescription}>
            Book experienced and vetted house cleaners at the best prices.
          </Text>
          <TouchableOpacity style={styles.bookButton}onPress={handleNavigateBook}>
            <Text style={styles.bookButtonText} >Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.servicesSectionTitle}>Available Services</Text>
          <View style={styles.servicesGrid}>
            {availableServices.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceIconContainer}>
                  <Icon name={service.icon} size={24} color="#FF9800" />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ScrollingText />

        <View style={[styles.featureCard, { backgroundColor: '#FF9800' }]}>
          <Text style={styles.featureTitle}>Professional Cooking Service</Text>
          <Text style={styles.featureDescription}>
            Book experienced chefs to cook delicious meals at your home.
          </Text>
          <TouchableOpacity style={styles.bookButton} onPress={handleNavigateBook}>
            <Text style={[styles.bookButtonText, { color: '#FF9800' }]}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.featureCard, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.featureTitle}>Repeat Previous Order</Text>
          <Text style={styles.featureDescription}>
            Schedule and manage recurring cleanings with  professionals.
          </Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={[styles.bookButtonText, { color: '#4CAF50' }]}>Schedule Now</Text>
          </TouchableOpacity>
        </View>

        <ReviewsSlider />

        <View style={{ marginTop: 20 }} />
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <View style={styles.upcomingFeatures}>
          {upcomingFeatures.map((feature) => (
            <View key={feature.id} style={styles.upcomingFeatureCard}>
              <Text style={styles.upcomingFeatureTitle}>{feature.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.blurOverlay} />
      <LinearGradient
      colors={['rgba(243, 243, 233, 0)', 'rgba(247, 243, 241, 0.95)']}
      style={styles.bottomBlur}
    />
      <View style={styles.bottomDock}>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="home-outline" size={24} color="#FF9800" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={handleNavigate}>
          <Icon name="time-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={handleNavigateWallet}>
          <Icon name="wallet-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={handleNavigateSettings}>
          <Icon name="settings-outline" size={24} color="#757575" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3e9',                                    
  },
  scrollView: {
    flex: 1,
    marginTop: 90,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  
    paddingHorizontal: 20,
    paddingTop: 20,
   
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'semi-bold',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  headerBottom: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 29,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  profileIcon: {
    padding: 5,
  },
  featureCard: {
    backgroundColor: '#282238',
    borderRadius: 25,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 48,
    shadowColor: '#FF9800',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  servicesSection: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  servicesSectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-between',
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    padding: 12,
    width: (width - 90) / 3,
    aspectRatio: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(224, 202, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  featureDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 24,
  },
  bookButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#FF9800',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  upcomingFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 110,
  },
  upcomingFeatureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: width / 3 - 20,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  upcomingFeatureTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  bottomDock: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  dockItem: {
    padding: 12,
  },
  bottomBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1
  },
  

  blurOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '',
    backgroundGradient: {
      colors: ['rgba(243, 243, 233, 0)', 'rgba(255, 255, 255, 0.9)'],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  
});

export default Home;

