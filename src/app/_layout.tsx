import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

const StackNavigator = createNativeStackNavigator();


const Layout = () => {
  return (
    
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="role"/>
          <Stack.Screen name="/customer/auth"/>
          <Stack.Screen name="/captain/auth"/>
          <Stack.Screen name="/captain/Home"/>
          <Stack.Screen name="/customer/Home"/>
        </Stack>
      
  
  );
};

export default gestureHandlerRootHOC(Layout);
