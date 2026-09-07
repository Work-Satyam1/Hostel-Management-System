import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const memoryFallback = new Map();

export const storage = {
  async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        } else {
          memoryFallback.set(key, value);
        }
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.warn('Storage setItem failed, using fallback:', error);
      memoryFallback.set(key, value);
    }
  },

  async getItem(key) {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(key);
        }
        return memoryFallback.get(key) || null;
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.warn('Storage getItem failed, using fallback:', error);
      return memoryFallback.get(key) || null;
    }
  },

  async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
        memoryFallback.delete(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.warn('Storage removeItem failed, using fallback:', error);
      memoryFallback.delete(key);
    }
  }
};

export default storage;
