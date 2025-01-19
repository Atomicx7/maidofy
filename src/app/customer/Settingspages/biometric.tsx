import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

class BiometricsService {
  private static instance: BiometricsService;

  private constructor() {}

  public static getInstance(): BiometricsService {
    if (!BiometricsService.instance) {
      BiometricsService.instance = new BiometricsService();
    }
    return BiometricsService.instance;
  }

  public async checkBiometricSupport(): Promise<{ available: boolean }> {
    if (Platform.OS === 'web') {
      return { available: false };
    }

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      return { available: hasHardware && isEnrolled };
    } catch (error) {
      console.error('Biometric check error:', error);
      return { available: false };
    }
  }

  public async authenticate(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirm fingerprint to continue',
        fallbackLabel: 'Use passcode'
      });
      
      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }
}

export const biometricsService = BiometricsService.getInstance();