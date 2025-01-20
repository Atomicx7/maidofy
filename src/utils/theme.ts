import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#FF9800',
    secondary: '#757575',
    card: '#F5F5F5',
    border: '#E0E0E0',
    shadow: '#000000'
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#FF9800',
    secondary: '#9E9E9E',
    card: '#1E1E1E',
    border: '#333333',
    shadow: '#000000'
  }
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return {
    colors: Colors[colorScheme === 'dark' ? 'dark' : 'light'],
    isDark: colorScheme === 'dark'
  };
};