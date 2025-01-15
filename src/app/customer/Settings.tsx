import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

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

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: '1', title: 'Profile Information', icon: 'person-outline' },
        { id: '2', title: 'Payment Methods', icon: 'card-outline' },
        { id: '3', title: 'Address Book', icon: 'location-outline' },
        { id: '4', title: 'Language', icon: 'language-outline' },
      ],
    },
    {
      title: 'Preferences',
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
          title: 'Notifications', 
          icon: 'notifications-outline',
          isToggle: true,
          value: notificationsEnabled,
          onToggle: () => setNotificationsEnabled(prev => !prev)
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
        { id: '12', title: 'Data Usage', icon: 'analytics-outline' },
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
                    // Handle navigation or action
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
      backgroundColor: '#F5F5F5',
    },
    containerDark: {
      backgroundColor: '#000000',
    },
    fixedHeader: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      
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
      fontFamily: 'Inter-SemiBold',
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
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 12,
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
      borderRadius: 18,
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    iconContainerDark: {
      backgroundColor: 'rgba(255, 102, 0, 0.51)',
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

