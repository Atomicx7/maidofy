import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Toc = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Fair Treatment Policy</Text>  
          
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using the ProtoX application, you agree to be bound by these Terms and Conditions.
          </Text>

          <Text style={styles.sectionTitle}>2. Service Description</Text>
          <Text style={styles.text}>
            ProtoX provides a platform connecting users with professional cleaning and cooking service providers. We do not directly provide these services but facilitate the connection between users and service providers.
          </Text>

          <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
          <Text style={styles.text}>
            Users must provide accurate information when creating an account and booking services. Users are responsible for maintaining the confidentiality of their account credentials.
          </Text>

          <Text style={styles.sectionTitle}>4. Booking and Cancellation</Text>
          <Text style={styles.text}>
            Users may book services through the application subject to availability. Cancellations must be made at least 24 hours before the scheduled service time to receive a full refund.
          </Text>

          <Text style={styles.sectionTitle}>5. Privacy</Text>
          <Text style={styles.text}>
            We collect and process personal data in accordance with our Privacy Policy. By using our services, you consent to such processing and warrant that all data provided is accurate.
          </Text>

          <Text style={styles.sectionTitle}>6. Liability</Text>
          <Text style={styles.text}>
            ProtoX is not liable for any damages or losses resulting from the use of our services or any actions of service providers booked through our platform.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default Toc;
