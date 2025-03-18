import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NativeRegularStorage } from '../NativeRegularStorage';

// Mock AsyncStorage
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

// Import AsyncStorage after the mock is defined
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('NativeRegularStorage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('Storage operations', () => {
    it('should find a value from storage', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const testValue = 'testValue';
      const testKey = 'testKey';

      // Mock AsyncStorage.getItem to return our test value
      vi.mocked(AsyncStorage.getItem).mockResolvedValue(testValue);

      // Act
      const result = await storage.find(testKey);

      // Assert
      expect(result).toEqual(testValue);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    });

    it('should return undefined for non-existent keys', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const nonExistentKey = 'nonExistentKey';

      // Mock AsyncStorage.getItem to return null (key not found)
      vi.mocked(AsyncStorage.getItem).mockResolvedValue(null);

      // Act
      const result = await storage.find(nonExistentKey);

      // Assert
      expect(result).toBeUndefined();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(nonExistentKey);
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    });

    it('should save a value to storage', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const testValue = 'test value';
      const testKey = 'testKey';

      // Mock AsyncStorage.setItem to resolve successfully
      vi.mocked(AsyncStorage.setItem).mockResolvedValue(undefined);

      // Act
      await storage.save(testKey, testValue);

      // Assert
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, testValue);
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('should remove a value from storage', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const testKey = 'testKey';

      // Mock AsyncStorage.removeItem to resolve successfully
      vi.mocked(AsyncStorage.removeItem).mockResolvedValue(undefined);

      // Act
      await storage.remove(testKey);

      // Assert
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(testKey);
      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when finding a value', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const testKey = 'testKey';
      const error = new Error('AsyncStorage error');

      // Mock AsyncStorage.getItem to reject with an error
      vi.mocked(AsyncStorage.getItem).mockRejectedValue(error);

      // Act & Assert
      await expect(storage.find(testKey)).rejects.toThrow('AsyncStorage error');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(testKey);
    });

    it('should handle errors when saving a value', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const testKey = 'testKey';
      const testValue = 'test value';
      const error = new Error('AsyncStorage error');

      // Mock AsyncStorage.setItem to reject with an error
      vi.mocked(AsyncStorage.setItem).mockRejectedValue(error);

      // Act & Assert
      await expect(storage.save(testKey, testValue)).rejects.toThrow('AsyncStorage error');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(testKey, testValue);
    });

    it('should handle errors when removing a value', async () => {
      // Arrange
      const storage = new NativeRegularStorage();
      const testKey = 'testKey';
      const error = new Error('AsyncStorage error');

      // Mock AsyncStorage.removeItem to reject with an error
      vi.mocked(AsyncStorage.removeItem).mockRejectedValue(error);

      // Act & Assert
      await expect(storage.remove(testKey)).rejects.toThrow('AsyncStorage error');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(testKey);
    });
  });
});