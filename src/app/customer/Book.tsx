'use client'

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Settings, Check } from 'lucide-react-native';

// Types
interface BookingFormData {
  selectedServices: string[];
  numberOfRooms: number;
  date: string;
  time: string;
  comments: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
}

const SERVICES: Service[] = [
  { id: 'regular', name: 'Regular Cleaning', description: 'Standard cleaning service' },
  { id: 'deep', name: 'Deep Cleaning', description: 'Thorough deep cleaning' },
  { id: 'moveout', name: 'Move Out Cleaning', description: 'Complete move out service' },
  { id: 'windows', name: 'Window Cleaning', description: 'Professional window cleaning' },
];

export default function Book() {
  const [formData, setFormData] = useState<BookingFormData>({
    selectedServices: [],
    numberOfRooms: 1,
    date: '',
    time: '',
    comments: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showServicePicker, setShowServicePicker] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  // Room selector component
  const RoomSelector = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Number of Rooms</Text>
      <View style={styles.roomsContainer}>
        {[1, 2, 3, 4].map((number) => (
          <TouchableOpacity
            key={number}
            style={[
              styles.roomButton,
              formData.numberOfRooms === number && styles.selectedRoom,
            ]}
            onPress={() => setFormData({ ...formData, numberOfRooms: number })}
          >
            <Text
              style={[
                styles.roomButtonText,
                formData.numberOfRooms === number && styles.selectedRoomText,
              ]}
            >
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Book Your Service</Text>
            <Text style={styles.subtitle}>Select the services you need</Text>
          </View>

          {/* Services Selection */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Select Services</Text>
            <View style={styles.servicesContainer}>
              {SERVICES.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceButton,
                    formData.selectedServices.includes(service.id) && styles.selectedService,
                  ]}
                  onPress={() => handleServiceToggle(service.id)}
                >
                  <View style={styles.serviceContent}>
                    <Text style={[
                      styles.serviceText,
                      formData.selectedServices.includes(service.id) && styles.selectedServiceText,
                    ]}>
                      {service.name}
                    </Text>
                    {formData.selectedServices.includes(service.id) && (
                      <Check size={20} color="#fff" />
                    )}
                  </View>
                  <Text style={[
                    styles.serviceDescription,
                    formData.selectedServices.includes(service.id) && styles.selectedServiceText,
                  ]}>
                    {service.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Selected Services */}
          {formData.selectedServices.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Selected Services</Text>
              <View style={styles.selectedServicesContainer}>
                {formData.selectedServices.map((serviceId) => {
                  const service = SERVICES.find(s => s.id === serviceId);
                  return (
                    <View key={serviceId} style={styles.selectedServiceChip}>
                      <Text style={styles.selectedServiceChipText}>{service?.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Room Selector */}
          <RoomSelector />

          {/* Date & Time Selection */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Schedule</Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity
                style={styles.dateTimePicker}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeLabel}>Date</Text>
                <Text style={styles.dateTimeText}>
                  {formData.date || 'Select Date'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateTimePicker}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeLabel}>Time</Text>
                <Text style={styles.dateTimeText}>
                  {formData.time || 'Select Time'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setFormData({
                    ...formData,
                    date: date.toLocaleDateString(),
                  });
                }
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              onChange={(event, date) => {
                setShowTimePicker(false);
                if (date) {
                  setFormData({
                    ...formData,
                    time: date.toLocaleTimeString(),
                  });
                }
              }}
            />
          )}

          {/* Comments */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Additional Comments</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Add any special instructions or requirements..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              value={formData.comments}
              onChangeText={(text) =>
                setFormData({ ...formData, comments: text })
              }
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f3e9',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 60,
    gap: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  servicesContainer: {
    gap: 12,
  },
  serviceButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedService: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  serviceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedServiceText: {
    color: '#FFFFFF',
  },
  selectedServicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedServiceChip: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedServiceChipText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '500',
  },
  roomsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roomButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedRoom: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  roomButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
  },
  selectedRoomText: {
    color: '#FFFFFF',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateTimePicker: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

