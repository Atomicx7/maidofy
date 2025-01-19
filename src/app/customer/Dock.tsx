import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface DockProps {
  handleNavigate: () => void;
  handleNavigateWallet: () => void;
  handleNavigateSettings: () => void;
}

const Dock: React.FC<DockProps> = ({ handleNavigate, handleNavigateWallet, handleNavigateSettings }) => {
  return (
    <View style={styles.bottomDock}>
      <TouchableOpacity style={styles.dockItem}>
        <Icon name="home-outline" size={24} color="#FF9800" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dockItem} onPress={handleNavigate}>
        <Icon name="time-outline" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dockItem} onPress={handleNavigateWallet}>
        <Icon name="wallet-outline" size={24} color="#757575" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dockItem} onPress={handleNavigateSettings}>
        <Icon name="settings-outline" size={24} color="#757575" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomDock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  dockItem: {
    alignItems: 'center',
  },
});

export default Dock;