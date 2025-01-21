import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { authenticateWithBiometrics } from '../app/customer/Settingspages/biometric';
import { biometricsService } from '../app/customer/Settingspages/biometric';


const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkBiometricAuth();
  }, []);
  const checkBiometricAuth = async () => {
    try {
      const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');
      if (biometricEnabled === 'true') {
        const authenticated = await biometricsService.authenticate();
        setIsAuthenticated(authenticated);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setIsAuthenticated(false);
    }
  };
  
  if (!isAuthenticated) {
    return null; // Or show a loading/authentication screen
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="customer/auth"/>
      <Stack.Screen name="captain/auth"/>
      <Stack.Screen name="captain/Home"/>
      <Stack.Screen name="customer/Home"/>
      <Stack.Screen name="customer/History"/>
      <Stack.Screen name="customer/Wallet"/>
      <Stack.Screen name="customer/Settings"/>
      <Stack.Screen name="customer/profileSection"/>
    </Stack>
  );
};

export default gestureHandlerRootHOC(Layout);