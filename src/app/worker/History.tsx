import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getWorkerData } from '@/storage'; // Import worker-specific storage functions

const { width } = Dimensions.get('window');

interface Appointment {
  _id: string;
  service: {
    name: string;
  };
  customerMobileNumber: string;
  date: string;
  status: string;
}

const WorkerHistory = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const storedWorkerData = await getWorkerData('workerData');
        if (storedWorkerData) {
          const endpoint = `http://192.168.29.223:3000/workerHistory/${storedWorkerData.mobileNumber}`;
          const response = await axios.get(endpoint);
          setAppointments(response.data);
          setFilteredAppointments(response.data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = appointments.filter((appointment) =>
      (appointment.service?.name.toLowerCase().includes(query.toLowerCase()) || '') ||
      (appointment.customerMobileNumber.toLowerCase().includes(query.toLowerCase()) || '')
    );
    setFilteredAppointments(filtered);
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
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
        <TextInput
          style={styles.searchBar}
          placeholder="Search appointments"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.appointmentsSection}>
          <Text style={styles.sectionTitle}>Recent Appointments</Text>
          {filteredAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment._id}
              style={styles.appointmentItem}
              onPress={() => handleAppointmentPress(appointment)}
            >
              <View style={styles.appointmentLeft}>
                <View style={styles.appointmentIcon}>
                  <Icon name="person-circle-outline" size={32} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.appointmentService}>
                    {appointment.service.name}
                  </Text>
                  <Text style={styles.appointmentCustomer}>
                    {appointment.customerMobileNumber}
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

      {selectedAppointment && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Appointment Details</Text>
              <Text style={styles.modalText}>Service: {selectedAppointment.service.name}</Text>
              <Text style={styles.modalText}>Customer: {selectedAppointment.customerMobileNumber}</Text>
              <Text style={styles.modalText}>Date: {formatDate(selectedAppointment.date)}</Text>
              <Text style={styles.modalText}>Status: {selectedAppointment.status}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
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
  searchBar: {
    marginTop: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    backgroundColor: '#444444',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
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
  appointmentCustomer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  appointmentDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  appointmentDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  bottomSpacing: {
    height: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default WorkerHistory;