import { authStyles } from "@/styles/authStyles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/shared/CustomText";
import PhoneInput from "@/components/shared/PhoneInput";
import { commonStyles } from "@/styles/commonStyles";
import CustomButton from "@/components/shared/CustomButton";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { storeWorkerData, getWorkerData, clearWorkerData } from '../../storage'; // Import worker-specific storage functions

const API_URL = 'http://192.168.29.223:3000'; // Replace with your actual API URL

const fetchWorkerData = async (mobileNumber: string) => {
  try {
    const response = await axios.get(`${API_URL}/workers/${mobileNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

type LoginNavigationProp = {
  navigate: (screen: string, params: { mobileNumber: string }) => void;
};

const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const fetchStoredWorkerData = async () => {
      const storedWorkerData = await getWorkerData('workerData');
      if (storedWorkerData) {
        navigation.navigate('worker/Home', {
          mobileNumber: storedWorkerData.mobileNumber,
        });
      }
    };

    fetchStoredWorkerData();
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

      console.log('Clearing old session data...');
      await clearWorkerData('workerData'); // Clear old session data

      console.log('Fetching worker data for:', mobileNumber);
      const workerData = await fetchWorkerData(mobileNumber);
      console.log('Worker data fetched successfully:', workerData);

      if (workerData) {
        await storeWorkerData('workerData', workerData); // Store worker data in AsyncStorage
        navigation.navigate('worker/Home', {
          mobileNumber: workerData.mobileNumber,
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

        <TouchableOpacity onPress={() => navigation.navigate('worker/auth', {
            userId: "",
            userType: "customer",
            firstName: "",
            lastName: "",
            city: "",
            landmark: "",
            mobileNumber: ""
        })}>
          <CustomText fontFamily="Regular" variant="h5" style={[commonStyles.lightText, { textAlign: 'center' }, { marginVertical: 20 }]}>
            Don't have an account? Signup
          </CustomText>
        </TouchableOpacity>

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