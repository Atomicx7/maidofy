import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ServiceTagProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const ServiceTag = ({ label, selected, onPress }: ServiceTagProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  selectedLabel: {
    color: '#fff',
  },
});

