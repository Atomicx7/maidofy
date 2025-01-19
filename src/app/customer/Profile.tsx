import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { getData, storeData } from '@/storage'; // Import utility functions

type RouteParams = {
  key: string;
  name: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  landmark: string;
  city: string;
};

export default function Profile() {
  const route = useRoute<{ params: RouteParams }>();

  const { firstName, lastName, mobileNumber, address, landmark, city } = route.params;

  const [userData, setUserData] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    mobileNumber: mobileNumber || '',
    email: 'apnaapp@gmail.com',
    dob: 'dd/mm/yyyy',
    address: address || '',
    landmark: landmark || '',
    city: city || '',
    age: ''
  });

  const API_URL = 'http://192.168.29.223:3000';

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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile/${mobileNumber}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [mobileNumber]);

  const handleSave = async () => {
    try {
      const formattedUserData = {
        ...userData,
        dob: moment(userData.dob, 'DD/MM/YYYY').isValid() ? moment(userData.dob, 'DD/MM/YYYY').format('YYYY-MM-DD') : userData.dob
      };
  
      await axios.put(`${API_URL}/users/profile/${mobileNumber}`, formattedUserData);
      await storeData('userData', formattedUserData); // Store updated user data in AsyncStorage
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.accountInfo}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>First Name</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.firstName}
              onChangeText={(text) => setUserData({ ...userData, firstName: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Name</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.lastName}
              onChangeText={(text) => setUserData({ ...userData, lastName: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mobile Number</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.mobileNumber}
              onChangeText={(text) => setUserData({ ...userData, mobileNumber: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.dob}
              onChangeText={(text) => setUserData({ ...userData, dob: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.address}
              onChangeText={(text) => setUserData({ ...userData, address: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Landmark</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.landmark}
              onChangeText={(text) => setUserData({ ...userData, landmark: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>City</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.city}
              onChangeText={(text) => setUserData({ ...userData, city: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <TextInput
              style={styles.infoValue}
              value={userData.age}
              onChangeText={(text) => setUserData({ ...userData, age: text })}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  accountInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});