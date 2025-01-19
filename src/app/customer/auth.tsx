import { authStyles } from "@/styles/authStyles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Image, Text, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/shared/CustomText";
import PhoneInput from "@/components/shared/PhoneInput";
import { commonStyles } from "@/styles/commonStyles";
import CustomButton from "@/components/shared/CustomButton";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { storeData, getData } from '@/storage'; // Import utility functions

interface UserData {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    landmark: string;
  };
  age: string;
  userType: 'customer' | 'worker';
  balance: number;
}

// Replace with your local network IP address
const API_URL = 'http://192.168.29.223:3000'; // Example IP address, replace with your actual IP

const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

type AuthNavigationProp = {
  navigate: (screen: string, params?: {
    userId?: string;
    userType?: 'customer' | 'worker';
    firstName?: string;
    lastName?: string;
    city?: string;
    landmark?: string;
  }) => void;
};

const Auth = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    mobileNumber: '',
    firstName: '',
    lastName: '',
    address: {
      city: '',
      landmark: ''
    },
    age: '',
    userType: 'customer',
    balance: 0
  });

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const storedUserData = await getData('userData');
      if (storedUserData) {
        navigation.navigate('customer/Home', {
          userId: storedUserData._id,
          userType: storedUserData.userType,
          firstName: storedUserData.firstName,
          lastName: storedUserData.lastName,
          city: storedUserData.address.city,
          landmark: storedUserData.address.landmark
        });
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleRegister = async () => {
    try {
      setLoading(true);
      console.log('Starting registration process...');
      
      // Validation
      if (!userData.mobileNumber || userData.mobileNumber.length !== 10) {
        Alert.alert('Error', 'Please enter a valid mobile number');
        setLoading(false);
        return;
      }

      if (!userData.firstName || !userData.lastName) {
        Alert.alert('Error', 'Please enter your full name');
        setLoading(false);
        return;
      }

      console.log('Sending user data:', userData);
      const result = await registerUser(userData);
      console.log('Registration successful:', result);
      
      if (result) {
        await storeData('userData', result); // Store user data in AsyncStorage
        navigation.navigate('customer/Home', {
          userId: result._id,
          userType: userData.userType,
          firstName: userData.firstName,
          lastName: userData.lastName,
          city: userData.address.city,
          landmark: userData.address.landmark
        });
      }
    } catch (error: any) {
      console.error('Registration error details:', error);
      Alert.alert(
        'Registration Failed',
        error.message || 'Please check your connection and try again'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.container}>
        <View style={commonStyles.flexRowBetween}>
          <Image source={require('@/assets/images/logo_t.png')} style={authStyles.logo} />
          <TouchableOpacity style={authStyles.flexRowGap}>
            <MaterialIcons name="help" size={18} color="black" />
            <CustomText fontFamily="Medium" variant="h6">Help</CustomText>
          </TouchableOpacity>
        </View>

        <CustomText fontFamily="Medium" variant="h2">Register</CustomText>

        <PhoneInput 
          value={userData.mobileNumber}
          onChangeText={(text) => setUserData(prev => ({...prev, mobileNumber: text}))}
        />

        <TextInput
          style={authStyles.input}
          placeholder="First Name"
          value={userData.firstName}
          onChangeText={(text) => setUserData(prev => ({...prev, firstName: text}))}
        />

        <TextInput
          style={authStyles.input}
          placeholder="Last Name"
          value={userData.lastName}
          onChangeText={(text) => setUserData(prev => ({...prev, lastName: text}))}
        />

        <TextInput
          style={authStyles.input}
          placeholder="City"
          value={userData.address.city}
          onChangeText={(text) => setUserData(prev => ({
            ...prev,
            address: {...prev.address, city: text}
          }))} 
        />

        <TextInput
          style={authStyles.input}
          placeholder="Landmark"
          value={userData.address.landmark}
          onChangeText={(text) => setUserData(prev => ({
            ...prev,
            address: {...prev.address, landmark: text}
          }))} 
        />

        <TextInput
          style={authStyles.input}
          placeholder="Age"
          value={userData.age}
          onChangeText={(text) => setUserData(prev => ({...prev, age: text}))}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={() => navigation.navigate('customer/Login')}>
          <Text style={[commonStyles.lightText, { textAlign: 'center', marginVertical: 20 }]}>
            Already have an account? Go to Login
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={authStyles.footerContainer}>
        <Text style={[commonStyles.lightText, { textAlign: 'center', marginHorizontal: 20 }]}>
          By continuing, you agree to conditions to the Cleannest
        </Text>
        <CustomButton
          title="Register"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView> 
  );
};

export default Auth;