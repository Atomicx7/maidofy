import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '@/storage'; // Import utility function
import io from 'socket.io-client';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../utils/theme';

const { width } = Dimensions.get('window');
const socket = io('http://192.168.29.223:3000');

const Home = () => {
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
  });
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);

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
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
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

  const handleSendMessage = (message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => {
    socket.emit('message', { user: userData.firstName, message });
  };

  const handleNavigateProfile = () => {
    router.navigate(`./Profile?firstName=${userData.firstName}&lastName=${userData.lastName}&mobileNumber=${userData.mobileNumber}&landmark=${userData.landmark}&city=${userData.city}&address=${userData.address}`);
  };
  const handleBookProfile = () => {
    router.navigate("./Book");
  };

  const availableServices = [
    { id: 1, color: '#FF9800', title: 'Cleaning', icon: 'broom-outline' },
    { id: 2, color: '#4CAF50', title: 'Laundry', icon: 'shirt-outline' },
    { id: 3, color: '#2196F3', title: 'Cooking', icon: 'restaurant-outline' },
    { id: 4, color: '#9C27B0', title: 'Babysitting', icon: 'baby-outline' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? '#000000' : '#fff'} />
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <View style={styles.brandContainer}>
            <Image source={require('../../assets/LOGOS/logo3.png')} style={styles.logo} />
            <Text style={styles.appName}>Kwick</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon} onPress={handleNavigateProfile}>
            <Icon name="person-circle-outline" size={56} color="#555555" />
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
            source={isDark ? require('../../assets/images/Magneto.jpeg') : require('../../assets/images/maid.jpg')}
            blurRadius={20}
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
            backgroundColor: isDark ? 'rgba(18, 18, 18, 0.42)' : 'rgba(6, 6, 6, 0.42)',
          }} />
          <Text style={styles.featureTitle}>Professional Cleaning Services</Text>
          <Text style={styles.featureDescription}>
            Book experienced and vetted house cleaners at the best prices.
          </Text>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookProfile}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesSection}>
          <Text style={[styles.servicesSectionTitle, { color: colors.text }]}>
            Available Services
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.servicesGrid}>
              {availableServices.map((service: { id: React.Key | null | undefined; color: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; icon: any; }) => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    {
                      backgroundColor: isDark ? `${service.color}20` : `${service.color}10`,
                      borderColor: colors.border
                    }
                  ]}
                  onPress={() => handleSendMessage(service.title)}
                >
                  <View
                    style={[
                      styles.serviceIconContainer,
                      {
                        backgroundColor: isDark ? `${service.color}30` : `${service.color}20`
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

        <View style={styles.messagesSection}>
          <Text style={styles.messagesSectionTitle}>Messages</Text>
          {messages.map((message, index) => (
            <View key={index} style={styles.messageCard}>
              <Text style={styles.messageText}>{message.user}: {message.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.blurOverlay} />
      <LinearGradient
        colors={isDark ? ['rgba(18, 18, 18, 0)', 'rgba(0, 0, 0, 0.95)'] : ['rgba(243, 243, 233, 0)', 'rgba(247, 243, 241, 0.95)']}
        style={styles.bottomBlur}
      />

      <View style={styles.bottomDock}>
        <TouchableOpacity style={styles.dockItem}>
          <Icon name="home-outline" size={24} color="#FF9800" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={() => router.navigate('./History')}>
          <Icon name="time-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={() => router.navigate('./Wallet')}>
          <Icon name="wallet-outline" size={24} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dockItem} onPress={() => router.navigate('./Settings')}>
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
    marginRight: 12,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'semi-bold',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  headerBottom: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
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
    borderWidth: 2,
    borderColor: 'rgba(193, 193, 193, 0.24)',
    borderRadius: 40,
    padding: 20,
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
    width: 90,
    aspectRatio: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
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
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    borderWidth: 0.1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginEnd: 10,
    marginStart: 10,
  },
  bookButtonText: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  messagesSection: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  messagesSectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  messageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  bottomBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    height: 64,
    borderRadius: 26,
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
});

export default Home;