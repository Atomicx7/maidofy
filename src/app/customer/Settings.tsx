import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';


import AsyncStorage from '@react-native-async-storage/async-storage';
// import { checkBiometricSupport } from '../../app/customer/Settingspages/biometric';
import { biometricsService } from '../../app/customer/Settingspages/biometric';


type SettingsItem = {
  id: string;
  title: string;
  icon: string;
  isToggle?: boolean;
  value?: boolean;
  onToggle?: () => void;
};

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    checkBiometricSettings();
  }, []);

  const checkBiometricSettings = async () => {
    const { available } = await biometricsService.checkBiometricSupport();
    setIsBiometricSupported(available);
    const enabled = await AsyncStorage.getItem('biometricEnabled');
    setIsBiometricEnabled(enabled === 'true');
  };
  
  const handleBiometricToggle = async () => {
    if (!isBiometricSupported) return;
    const newValue = !setIsBiometricEnabled;
    await AsyncStorage.setItem('biometricEnabled', String(newValue));
    setIsBiometricEnabled(newValue);
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: '1', title: 'Edit Profile', icon: 'person-outline' },
        { id: '2', title: 'Payment Methods', icon: 'card-outline' },
        { id: '3', title: 'Address Book', icon: 'location-outline' },
        { id: '4', title: 'Language', icon: 'language-outline' },
      ],
    },
    {
      title: 'Security and preferences',
      items: [
        { 
          id: '5', 
          title: 'Dark Mode', 
          icon: 'moon-outline',
          isToggle: true,
          value: isDarkMode,
          onToggle: () => setIsDarkMode(prev => !prev)
        },
        { 
          id: '6', 
          title: 'Use Fingerprint', 
          icon: 'finger-print-outline',
          isToggle: true,
          value: isBiometricSupported,
          onToggle: handleBiometricToggle,
          disabled: !isBiometricSupported
        },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: '7', title: 'Help Center', icon: 'help-circle-outline' },
        { id: '8', title: 'Contact Us', icon: 'mail-outline' },
        { id: '9', title: 'Report an Issue', icon: 'warning-outline' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { id: '10', title: 'Privacy Policy', icon: 'shield-outline' },
        { id: '11', title: 'Terms of Service', icon: 'document-text-outline' },
        { id: '12', title: 'Delete My Account', icon: 'analytics-outline' },
        { id: '13', title: 'Fair Treatment Policy', icon: 'analytics-outline' },
      ],
      
    },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={[styles.fixedHeader, isDarkMode && styles.fixedHeaderDark]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon 
              name="arrow-back" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#1a1a1a'} 
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>
            Settings
          </Text>
          <View style={{ width: 24 }}>
            <Text> </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, index) => (
          <View 
            key={section.title} 
            style={[
              styles.section,
              index === 0 && styles.firstSection,
              isDarkMode && styles.sectionDark
            ]}
          >
            <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>
              {section.title}
            </Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.settingItem,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                  isDarkMode && styles.settingItemDark
                ]}
                onPress={() => {
                  if (!('isToggle' in item)) {
                    switch (item.id) {
                      case '1':
                        router.push('/customer/Profile');
                        break;
                      case '2':
                        router.push('/customer/Settingspages/paymentmethods');
                        break;
                      case '3':
                        router.push('/customer/Settingspages/addressbook');
                        break;
                      case '4':
                        router.push('/customer/Settingspages/Language');
                        break;
                      case '7':
                        router.push('/customer/Settingspages/helpcentre');
                        break;
                      case '8':
                        router.push('/customer/Settingspages/contactus');
                        break;
                      case '9':
                        router.push('/customer/Settingspages/report');
                        break;
                      case '10':
                        router.push('/customer/Settingspages/Privacy');
                        break;
                      case '11':
                        router.push('/customer/Settingspages/Tos');
                        break;
                      case '12':
                        router.push('/customer/Settingspages/Delete-acc');
                        break;
                      case '13':
                        router.push('/customer/Settingspages/Ftp');
                        break;
                    }
                  }
                }}
              >
                <View style={styles.settingItemLeft}>
                  <View style={[styles.iconContainer, isDarkMode && styles.iconContainerDark]}>
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      color={isDarkMode ? '#FFFFFF' : '#FF9800'} 
                    />
                  </View>
                  <Text style={[styles.settingItemText, isDarkMode && styles.settingItemTextDark]}>
                    {item.title}
                  </Text>
                </View>
                {'isToggle' in item ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#767577', true: '#FF9800' }}
                    thumbColor={item.value ? '#fff' : '#f4f3f4'}
                  />
                ) : (
                  <Icon 
                    name="chevron-forward" 
                    size={20} 
                    color={isDarkMode ? '#FFFFFF' : '#1a1a1a'} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    containerDark: {
      backgroundColor: '#000000',
    },
    fixedHeader: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 15,
      backgroundColor: 'rgb(255, 255, 255)',
      
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    fixedHeaderDark: {
      backgroundColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      padding: 8,
      marginLeft: -8,
    },
    headerTitle: {
      fontSize: 22,
      fontFamily: 'SemiBold',
      color: '#1a1a1a',
      letterSpacing: -0.5,
    },
    headerTitleDark: {
      color: '#FFFFFF',
    },
    scrollView: {
      flex: 1,
      marginTop: 10,
    },
    section: {
      marginBottom: 24,
      paddingHorizontal: 20,
    },
    firstSection: {
      marginTop: 20,
    },
    sectionDark: {
      backgroundColor: '#000000',
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: '#1a1a1a',
      marginBottom: 16,
      letterSpacing: -0.5,
    },
    sectionTitleDark: {
      color: '#FFFFFF',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgb(255, 254, 249)',
      padding: 16,
      borderRadius: 22,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    settingItemDark: {
      backgroundColor: '#1a1a1a',
    },
    lastItem: {
      marginBottom: 0,
    },
    settingItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 14,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    iconContainerDark: {
      backgroundColor: 'rgba(180, 79, 11, 0.71)',
    },
    settingItemText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: '#1a1a1a',
    },
    settingItemTextDark: {
      color: '#FFFFFF',
    },
    bottomSpacing: {
      height: 20,
    },
  });

export default Settings;

function setIsBiometricEnabled(arg0: boolean) {
  throw new Error('Function not implemented.');
}

