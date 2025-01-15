import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Mock appointment data
const recentAppointments = [
  {
    id: '1',
    cleaner: 'John Doe',
    service: 'House Cleaning',
    date: '2025-01-14T14:30:00',
  },
  {
    id: '2',
    cleaner: 'Jane Smith',
    service: 'Deep Clean',
    date: '2025-01-13T11:20:00',
  },
  {
    id: '3',
    cleaner: 'Emily Johnson',
    service: 'Kitchen Cleaning',
    date: '2025-01-12T09:45:00',
  },
  {
    id: '4',
    cleaner: 'Michael Brown',
    service: 'Bathroom Cleaning',
    date: '2025-01-11T16:15:00',
  },
];

const History = () => {
  const navigation = useNavigation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAppointmentPress = (appointmentId: string) => {
    console.log(`Appointment ${appointmentId} pressed`);
    // Implement navigation or action on press
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>History</Text>
          <View style={{ width: 24 }}>
            <Text> </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Recent Appointments</Text>
          {recentAppointments.map(appointment => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentItem}
              onPress={() => handleAppointmentPress(appointment.id)}
            >
              <View style={styles.appointmentLeft}>
                <View style={styles.appointmentIcon}>
                  <Icon name="person-circle-outline" size={32} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.appointmentService}>
                    {appointment.service}
                  </Text>
                  <Text style={styles.appointmentCleaner}>
                    {appointment.cleaner}
                  </Text>
                  <Text style={styles.appointmentDate}>
                    {formatDate(appointment.date)}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  appointmentsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appointmentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentService: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  appointmentCleaner: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  appointmentDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default History;
