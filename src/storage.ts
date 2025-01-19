import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting data:', e);
  }
};

export const clearData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error clearing data:', e);
  }
};

// New storage functions for worker data
export const storeWorkerData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`worker_${key}`, jsonValue);
  } catch (e) {
    console.error('Error storing worker data:', e);
  }
};

export const getWorkerData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`worker_${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting worker data:', e);
  }
};

export const clearWorkerData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`worker_${key}`);
  } catch (e) {
    console.error('Error clearing worker data:', e);
  }
};