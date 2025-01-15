import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock transaction data
const recentTransactions = [
  {
    id: '1',
    type: 'credit',
    amount: 50.00,
    description: 'Added to wallet',
    date: '2024-01-14T14:30:00',
  },
  {
    id: '2',
    type: 'debit',
    amount: 35.00,
    description: 'House Cleaning Service',
    date: '2024-01-13T11:20:00',
  },
  {
    id: '3',
    type: 'credit',
    amount: 100.00,
    description: 'Added to wallet',
    date: '2024-01-12T09:45:00',
  },
  {
    id: '4',
    type: 'debit',
    amount: 45.00,
    description: 'Kitchen Deep Clean',
    date: '2024-01-11T16:15:00',
  },
];

const Wallet = () => {
  const [balance, setBalance] = useState(70.00);

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
    // Implement add money logic
    console.log('Add money');
  };

  const handleWithdraw = () => {
    // Implement withdraw logic
    console.log('Withdraw money');
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
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
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
          {recentTransactions.map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
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
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </Text>
            </View>
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
});

export default Wallet;

