import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Dock from './Dock';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '@/storage'; // Import utility function
import io from 'socket.io-client';
import { ScrollingText } from './scrolling-text';
import { ReviewsSlider } from './reviews-slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../utils/theme';
import { 
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { 
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import {Audiowide_400Regular } from '@expo-google-fonts/audiowide';

const { width } = Dimensions.get('window');
const socket = io('http://192.168.29.223:3000');

const upcomingFeatures = [
  { id: '1', title: 'Subscription' },
  { id: '2', title: 'Gardening' },
  { id: '3', title: 'Pet Care' },
];

const availableServices = [
  { id: '1', title: 'Mopping', icon: 'sparkles-outline', color: '#4CAF50' },
  { id: '2', title: 'Brooming', icon: 'scan-outline', color: '#FF9800' },
  { id: '3', title: 'Kitchen', icon: 'fast-food-outline', color: '#F44336' },
  { id: '4', title: 'Bathroom', icon: 'water-outline', color: '#2196F3' },
  { id: '5', title: 'Ironing', icon: 'shirt-outline', color: '#9C27B0' },
  { id: '6', title: 'Dusting', icon: 'leaf-outline', color: '#795548' },
];

const Home = () => {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Audiowide_400Regular
  });

  const { colors, isDark } = useTheme();
  const [greeting, setGreeting] = useState('Good morning');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    landmark: '',
    city: '',
    latitude: '',
    longitude: '',
    profileImage: '',
  });
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  interface Bid {
    _id: string;
    price: number;
  }

  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const fetchStoredUserData = async () => {
      const storedUserData = await getData('userData');
      if (storedUserData) {
        setUserData(storedUserData);
      }
    };

    fetchStoredUserData();
  }, []);

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

  useEffect(() => {
    socket.on('newBid', (bid) => {
      setBids((prevBids) => [bid, ...prevBids]);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://192.168.29.223:3000/users/profile/${userData.mobileNumber}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      if (userData.mobileNumber) {
        fetchUserData();
      }
    }, [userData.mobileNumber])
  );

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleNavigate = async () => {
    router.navigate('./History');
  };
  const handleNavigateWallet = async () => {
    router.navigate('./Wallet');
  };
  const handleNavigateSettings = async () => {
    router.navigate('./Settings');
  };

  const handleNavigateProfile = () => {
    router.navigate('./profileSection.tsx');
  };
  const handleBookNow = () => {
    router.navigate('./Book');
  };

  const handleCreateServiceRequest = async () => {
    const serviceRequest = {
      customerId: 'customer-id', // Replace with actual customer ID
      description,
      price: parseFloat(price),
      location: { type: 'Point', coordinates: [userData.longitude, userData.latitude] }, // Use actual coordinates
    };
    const response = await axios.post('http://192.168.29.223:3000/service-requests', serviceRequest);
    socket.emit('createServiceRequest', response.data);
  };

  const handleAcceptBid = async (bidId: string) => {
    await axios.post(`http://192.168.29.223:3000/bids/${bidId}/status`, { status: 'accepted' });
  };

  const handleDeclineBid = async (bidId: string) => {
    await axios.post(`http://192.168.29.223:3000/bids/${bidId}/status`, { status: 'declined' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar  barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={isDark ? '#000000' : '#fff'} />
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <View style={styles.brandContainer}>
            <Image 
              source={require('../../assets/LOGOS/logo5.1.png')} 
              style={styles.logo} 
            />
            <Text style={[styles.appName,{ fontFamily: 'Audiowide_400Regular', color: isDark ? '#FFFFFF' : '#1a1a1a' }]}>Kwick</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon} onPress={handleNavigateProfile}>
            {userData.profileImage ? (
              <Image 
                source={{ uri: userData.profileImage }} 
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('../../assets/images/customer.png')}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBottom}>
          <Text style={[styles.greeting, { color: colors.text }]}>{greeting}, {userData.firstName} {userData.lastName}</Text>
          <Text style={styles.location}>{userData.latitude}, {userData.longitude}</Text>
        </View>
        
        <View style={styles.featureCard}>
          
          <Image
             source={
              isDark 
                ? require('../../assets/images/Magneto.jpeg')
                : require('../../assets/images/maid.jpg')
            }
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '200%',
              height: '200%',
            }}
          />
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(8, 8, 8, 1)',
            backgroundColor: isDark ? 'rgba(104, 102, 102, 0.14)' : 'rgba(6, 6, 6, 0.42)',
          }} />
          <Text style={styles.featureTitle}>Professional Cleaning Services</Text>
          <Text style={styles.featureDescription}>
            Book experienced and vetted house cleaners at the best prices.
          </Text>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesSection}>
  <Text style={[styles.servicesSectionTitle, { color: colors.text }]}>
    Available Services
  </Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={styles.servicesGrid}>
      {availableServices.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceCard,
            {
              backgroundColor: isDark 
                ? `${service.color}20`
                : `${service.color}10`,
              borderColor: colors.border
            }
          ]}
          onPress={() => handleBookNow()}
        >
          <View 
            style={[
              styles.serviceIconContainer,
              {
                backgroundColor: isDark 
                  ? `${service.color}30`
                  : `${service.color}20`
              }
            ]}
          >
            <Icon name={service.icon} size={24} color={service.color} />
          </View>
          <Text style={[styles.serviceTitle, { color: service.color }]}>
            {service.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
</View>

        <ScrollingText />

       

        <View style={[styles.featureCard, { backgroundColor: isDark ? '#121212' : '#c6a788' }]}>
          <Text style={[styles.featureTitle,{color:isDark ? '#fff':'#1a1a1a'}]}>Repeat Previous Order</Text>
          <Text style={styles.featureDescription}>
            Schedule and manage recurring cleanings with your favorite professionals.
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
        colors={ isDark 
          ? ['rgba(18, 18, 18, 0)', 'rgba(0, 0, 0, 0.95)'] 
          : ['rgba(243, 243, 233, 0)', 'rgba(255, 211, 181, 0.92)']}
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
    paddingTop: 14,
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
    marginRight: 8,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'audiowide_400Regular',
    color: '#1a1a1a',
    letterSpacing: -1.0,
  },
  headerBottom: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Comfortaa_400Regular',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  profileIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  featureCard: {
    borderWidth: 2,
    borderColor: 'rgba(193, 193, 193, 0.24)',
    borderRadius: 40,
    padding: 20,
    // marginHorizontal: 16,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 48,
    shadowColor: '#FF9800',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
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
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
    width:90,
    // width: (width) / 4,
    aspectRatio: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    letterSpacing: 0,
  },
  featureDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 24,
  },
  bookButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.77)',
    backdropFilter:'blur(10px)',
    borderRadius: 24,
    borderWidth: 0.1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginEnd : 10,
    marginStart : 10,
  },
  bookButtonText: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
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
    left: 50,
    right: 50,
    height: 64,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fcebd5',
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
    zIndex: 1,
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});

export default Home;
