import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { getWorkerData, storeWorkerData } from '@/storage'; // Import worker-specific storage functions

type RouteParams = {
  key: string;
  name: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

type WorkerStackParamList = {
  'worker/Home': {
    dob: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    age: string;
  };
};

export default function WorkerProfile() {
  const navigation = useNavigation<NavigationProp<WorkerStackParamList>>();
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();


  const { firstName, lastName, mobileNumber, street, landmark, city, state, pincode } = route.params;

  const [workerData, setWorkerData] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    mobileNumber: mobileNumber || '',
    email: 'apnaapp@gmail.com',
    dob: 'dd/mm/yyyy',
    street: street || '',
    landmark: landmark || '',
    city: city || '',
    state: state || '',
    pincode: pincode || '',
    age: ''
  });

  const API_URL = 'http://192.168.29.223:3000';

  useEffect(() => {
    const fetchStoredWorkerData = async () => {
      const storedWorkerData = await getWorkerData('workerData');
      if (storedWorkerData) {
        setWorkerData(storedWorkerData);
      }
    };

    fetchStoredWorkerData();
  }, []);

  useEffect(() => {
    const fetchWorkerData = async () => {
      if (!mobileNumber) {
        console.error('Mobile number is undefined');
        Alert.alert('Error', 'Mobile number is undefined');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/workers/${mobileNumber}`);
        setWorkerData(response.data);
      } catch (error) {
        console.error('Error fetching worker data:', error);
        if (axios.isAxiosError(error as any) && (error as any).response) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as { message: string }).message;
          Alert.alert('Error', 'Error fetching worker data: ' + errorMessage);
        } else if ((error as Error).message) {
          const errorMessage = (error as Error).message;
          Alert.alert('Error', 'Network request failed: ' + errorMessage);
        } else {
          Alert.alert('Error', 'Error fetching worker data');
        }
      }
    };

    fetchWorkerData();
  }, [mobileNumber]);

  const handleSave = async () => {
    if (!mobileNumber) {
      console.error('Mobile number is undefined');
      Alert.alert('Error', 'Mobile number is undefined');
      return;
    }

    try {
      const formattedWorkerData = {
        ...workerData,
        dob: moment(workerData.dob, 'DD/MM/YYYY').isValid() ? moment(workerData.dob, 'DD/MM/YYYY').format('YYYY-MM-DD') : workerData.dob
      };

      await axios.put(`${API_URL}/workers/profile/${mobileNumber}`, formattedWorkerData);
      await storeWorkerData('workerData', formattedWorkerData); // Store updated worker data in AsyncStorage
      Alert.alert('Success', 'Profile updated successfully');
      navigation.navigate('worker/Home', { ...formattedWorkerData }); // Redirect to Home with updated attributes
    } catch (error) {
      console.error('Error updating profile:', error);
      if (axios.isAxiosError(error as any) && (error as any).response) {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data as { message: string }).message;
        Alert.alert('Error', 'Error updating profile: ' + errorMessage);
      } else {
        Alert.alert('Error', 'Error updating profile');
      }
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
              value={workerData.firstName}
              onChangeText={(text) => setWorkerData({ ...workerData, firstName: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Name</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.lastName}
              onChangeText={(text) => setWorkerData({ ...workerData, lastName: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mobile Number</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.mobileNumber}
              onChangeText={(text) => setWorkerData({ ...workerData, mobileNumber: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.email}
              onChangeText={(text) => setWorkerData({ ...workerData, email: text })}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.dob}
              onChangeText={(text) => setWorkerData({ ...workerData, dob: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Street</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.street}
              onChangeText={(text) => setWorkerData({ ...workerData, street: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Landmark</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.landmark}
              onChangeText={(text) => setWorkerData({ ...workerData, landmark: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>City</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.city}
              onChangeText={(text) => setWorkerData({ ...workerData, city: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>State</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.state}
              onChangeText={(text) => setWorkerData({ ...workerData, state: text })}
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Pincode</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.pincode}
              onChangeText={(text) => setWorkerData({ ...workerData, pincode: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <TextInput
              style={styles.infoValue}
              value={workerData.age}
              onChangeText={(text) => setWorkerData({ ...workerData, age: text })}
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