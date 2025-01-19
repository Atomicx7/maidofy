import axios from 'axios';

const API_URL = 'http://192.168.29.223:3000'; // Temporary fix until env is working

interface UserData {
  mobileNumber: string;
  firstName?: string;
  lastName?: string;
  address?: {
    city: string;
    landmark: string;
  };
  age?: string;
  userType: 'customer' | 'worker';
}

export const registerUser = async (userData: UserData) => {
  try {
    console.log('Attempting to connect to:', `${API_URL}/users/register`);
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // 5 second timeout
    });
    return response.data;
  } catch (error: any) {
    console.error('Full error:', error);
    throw error.response?.data || error.message;
  }
};