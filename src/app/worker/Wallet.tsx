import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import axios, { AxiosError } from 'axios';
import { getWorkerData } from '../../storage'; // Import worker-specific storage functions

const { width } = Dimensions.get('window');

const Wallet = () => {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  interface Transaction {
    _id: string;
    date: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<'credit' | 'debit'>('credit');
  const [amount, setAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await getWorkerData('workerData');
      if (storedUserData) {
        setMobileNumber(storedUserData.mobileNumber);
        fetchBalanceAndTransactions(storedUserData.mobileNumber);
      }
    };

    const fetchBalanceAndTransactions = async (mobileNumber: string) => {
      try {
        const userResponse = await axios.get(`http://192.168.29.223:3000/workers/balance/${mobileNumber}`);
        setBalance(userResponse.data.balance);

        const transactionsResponse = await axios.get(`http://192.168.29.223:3000/workerTransactions/${mobileNumber}`);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching balance and transactions:', error);
        if (axios.isAxiosError(error as any) && (error as any).response) {
          const axiosError = error as AxiosError;
          const errorMessage = (axiosError.response?.data as { message: string }).message;
          Alert.alert('Error', 'Error fetching balance and transactions: ' + errorMessage);
        } else {
          Alert.alert('Error', 'Error fetching balance and transactions');
        }
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddMoney = () => {
    setTransactionType('credit');
    setModalVisible(true);
  };

  const handleWithdraw = () => {
    setTransactionType('debit');
    setModalVisible(true);
  };

  const handleTransaction = async () => {
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const newTransaction = {
      mobileNumber,
      amount: transactionAmount,
    };

    try {
      const endpoint = transactionType === 'credit'
        ? 'http://192.168.29.223:3000/workers/addMoney'
        : 'http://192.168.29.223:3000/workers/withdrawMoney';

      const response = await axios.post(endpoint, newTransaction);
      setTransactions([response.data, ...transactions]);
      setBalance(prevBalance => transactionType === 'credit' ? (prevBalance ?? 0) + transactionAmount : (prevBalance ?? 0) - transactionAmount);
      setModalVisible(false);
      setAmount('');
    } catch (error) {
      console.error('Error processing transaction:', error);
      if (axios.isAxiosError(error as any) && (error as any).response) {
        const axiosError = error as AxiosError;
        Alert.alert('Error', 'Error processing transaction: ' + (axiosError.response?.data as { message: string }).message);
      } else {
        Alert.alert('Error', 'Error processing transaction');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wallet</Text>
          <View style={{ width: 24 }}>
            <Text> </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹{balance !== undefined ? balance.toFixed(2) : '0.00'}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.addButton]}
              onPress={handleAddMoney}
            >
              <Icon name="add-circle-outline" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.withdrawButton]}
              onPress={handleWithdraw}
            >
              <Icon name="arrow-down-circle-outline" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map(transaction => (
            <View key={transaction._id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  transaction.type === 'credit' ? styles.creditIcon : styles.debitIcon
                ]}>
                  <Icon 
                    name={transaction.type === 'credit' ? 'arrow-up' : 'arrow-down'} 
                    size={20} 
                    color="#FFFFFF" 
                  />
                </View>
                <View>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount
              ]}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{transactionType === 'credit' ? 'Add Money' : 'Withdraw Money'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleTransaction}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButton: {
    backgroundColor: '#FF9800',
  },
  withdrawButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  transactionsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  transactionItem: {
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
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditIcon: {
    backgroundColor: '#4CAF50',
  },
  debitIcon: {
    backgroundColor: '#FF9800',
  },
  transactionDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  creditAmount: {
    color: '#4CAF50',
  },
  debitAmount: {
    color: '#FF9800',
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default Wallet;