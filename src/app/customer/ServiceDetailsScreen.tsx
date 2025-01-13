import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceTag } from '../../components/customer/ServiceTag';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

type ServiceDetailsProps = NativeStackScreenProps<RootStackParamList, 'ServiceDetails'>;

const services = [
  'Wiping',
  'Glass Cleaning',
  'Brooming',
  'Washing Clothes',
  'Washing Utensils',
  'Cooking Food',
];

export const ServiceDetailsScreen = ({ route }: ServiceDetailsProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rooms, setRooms] = useState(1);
  const navigation = useNavigation();

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{route.params.serviceName}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Rooms</Text>
          <View style={styles.roomSelector}>
            <Button
              mode="outlined"
              onPress={() => setRooms(Math.max(1, rooms - 1))}
            >
              -
            </Button>
            <Text style={styles.roomCount}>{rooms}</Text>
            <Button
              mode="outlined"
              onPress={() => setRooms(rooms + 1)}
            >
              +
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Services</Text>
          <View style={styles.tags}>
            {services.map((service) => (
              <ServiceTag
                key={service}
                label={service}
                selected={selectedServices.includes(service)}
                onPress={() => toggleService(service)}
              />
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.dispatch(StackActions.replace('Home'))}
        >
          Continue
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  roomSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  roomCount: {
    fontSize: 20,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
});

