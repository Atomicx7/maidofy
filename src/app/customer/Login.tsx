import { authStyles } from "@/styles/authStyles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Image, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/shared/CustomText";
import PhoneInput from "@/components/shared/PhoneInput";
import { commonStyles } from "@/styles/commonStyles";
import CustomButton from "@/components/shared/CustomButton";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { storeData, getData } from '../../storage'; // Import utility functions

const API_URL = 'http://192.168.29.223:3000'; // Replace with your actual API URL

const fetchUserData = async (mobileNumber: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${mobileNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type LoginNavigationProp = {
  navigate: (screen: string, params: { userId: string; userType: 'customer' | 'worker'; firstName: string; lastName: string; city: string; landmark: string; mobileNumber: string; }) => void;
};

const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const fetchStoredUserData = async () => {
      const storedUserData = await getData('userData');
      if (storedUserData) {
        navigation.navigate('customer/Home', {
          userId: storedUserData._id,
          userType: storedUserData.userType,
          firstName: storedUserData.firstName,
          lastName: storedUserData.lastName,
          city: storedUserData.address.city,
          landmark: storedUserData.address.landmark,
          mobileNumber: storedUserData.mobileNumber,
        });
      }
    };

    fetchStoredUserData();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Starting login process...');

      if (!mobileNumber || mobileNumber.length !== 10) {
        Alert.alert('Error', 'Please enter a valid mobile number');
        setLoading(false);
        return;
      }

      console.log('Fetching user data for:', mobileNumber);
      const userData = await fetchUserData(mobileNumber);
      console.log('User data fetched successfully:', userData);

      if (userData) {
        await storeData('userData', userData); // Store user data in AsyncStorage
        navigation.navigate('customer/Home', {
          userId: userData._id,
          userType: userData.userType,
          firstName: userData.firstName,
          lastName: userData.lastName,
          city: userData.address.city,
          landmark: userData.address.landmark,
          mobileNumber: userData.mobileNumber,
        });
      }
    } catch (error: any) {
      console.error('Login error details:', error);
      Alert.alert(
        'Login Failed',
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

        <CustomText fontFamily="Medium" variant="h2">Login</CustomText>

        <PhoneInput 
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

      </ScrollView>

      <View style={authStyles.footerContainer}>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;