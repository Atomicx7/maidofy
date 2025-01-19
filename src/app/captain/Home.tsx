import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import MapComponent from './Map'; // Assuming you have a MapComponent
import { getData } from '@/storage'; // Import utility function

const Home = () => {
  const [isReadyForWork, setIsReadyForWork] = useState(false);
  interface Job {
    id: string;
    title: string;
    // Add other job properties here
  }

  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      // Fetch available jobs logic here
    };

    fetchJobs();
  }, []);

  const openMaps = () => {
    // Logic to open maps
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome, Captain</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Ready for Work</Text>
          <Switch
            value={isReadyForWork}
            onValueChange={setIsReadyForWork}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={isReadyForWork ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.mapCard} onPress={openMaps}>
        <MapComponent setLocation={setLocation} />
      </TouchableOpacity>

      <View style={styles.jobsSection}>
        <Text style={styles.sectionTitle}>Available Jobs Around You</Text>
        {availableJobs.map(job => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              {/* Add more job details here */}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  mapCard: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  jobsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  jobCard: {
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
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1a1a1a',
  },
});

export default Home;