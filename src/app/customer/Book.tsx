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
import { Settings } from 'lucide-react-native';

// Types
interface BookingFormData {
  cleaningType: string;
  numberOfRooms: number;
  date: string;
  time: string;
  comments: string;
}

export default function Book() {
  const [formData, setFormData] = useState<BookingFormData>({
    cleaningType: '',
    numberOfRooms: 1,
    date: '',
    time: '',
    comments: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  // Room selector component
  const RoomSelector = () => (
    <View style={styles.roomSelectorContainer}>
      <Text style={styles.label}>Numbers of Rooms</Text>
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
          <Text style={styles.subtitle}>Book Appointment</Text>

          {/* Cleaning Type Picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cleaning Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.cleaningType}
                onValueChange={(value) =>
                  setFormData({ ...formData, cleaningType: value })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Cleaning Type" value="" />
                <Picker.Item label="Regular Cleaning" value="regular" />
                <Picker.Item label="Deep Cleaning" value="deep" />
                <Picker.Item label="Move Out Cleaning" value="moveout" />
              </Picker>
            </View>
          </View>

          {/* Room Selector */}
          <RoomSelector />

          {/* Date & Time Selection */}
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimePicker}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.label}>Select Date</Text>
              <Text style={styles.dateTimeText}>
                {formData.date || 'Choose Date'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimePicker}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.label}>Select Time</Text>
              <Text style={styles.dateTimeText}>
                {formData.time || 'Choose Time'}
              </Text>
            </TouchableOpacity>
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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Comments</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Please describe your symptoms..."
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
            <Text style={styles.buttonText}>Request Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  roomSelectorContainer: {
    gap: 8,
  },
  roomsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roomButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRoom: {
    backgroundColor: '#5B45FF',
  },
  roomButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedRoomText: {
    color: '#fff',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateTimePicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    padding: 12,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#5B45FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

