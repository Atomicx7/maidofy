import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ArrowLeft } from 'react-native-feather';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft stroke="#fff" width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/p2.jpg-p63DjGsZiLXQizwcTlFQKwGhNcJDus.jpeg' }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>@appsinppuser</Text>
          <Text style={styles.email}>developer@appsnipp.com</Text>
        </View>
        <TouchableOpacity style={styles.homeButton}>
          <ArrowLeft stroke="#fff" width={20} height={20} />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Account Info Section */}
      <View style={styles.accountInfo}>
        <Text style={styles.sectionTitle}>Account Info</Text>
        
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/auto.png')} style={styles.icon} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>developer</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/auto.png')} style={styles.icon} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Mobile</Text>
            <Text style={styles.infoValue}>+91-8129999999</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/auto.png')} style={styles.icon} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>developer@appsnipp.com</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/auto.png')} style={styles.icon} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>Avenue 2nd Street NW SY</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/icons/auto.png')} style={styles.icon} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>D.O.B</Text>
            <Text style={styles.infoValue}>12-05-1990</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF5733',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  backButton: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  email: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  accountInfo: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
});