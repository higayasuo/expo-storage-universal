import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as SecureStore from 'expo-secure-store';
import { NativeSecureStorage } from '../NativeSecureStorage';

vi.mock('expo-secure-store', () => ({
  getItemAsync: vi.fn(),
  setItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
}));

describe('NativeSecureStorage', () => {
  let storage: NativeSecureStorage;

  beforeEach(() => {
    storage = new NativeSecureStorage();
    vi.clearAllMocks();
  });

  describe('find', () => {
    it('should return the value when key exists', async () => {
      const mockValue = 'test-value';
      vi.mocked(SecureStore.getItemAsync).mockResolvedValue(mockValue);

      const result = await storage.find('test-key');

      expect(result).toBe(mockValue);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('test-key');
    });

    it('should return undefined when key does not exist', async () => {
      vi.mocked(SecureStore.getItemAsync).mockResolvedValue(null);

      const result = await storage.find('non-existent-key');

      expect(result).toBeUndefined();
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('non-existent-key');
    });

    it('should throw error when getItemAsync fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(SecureStore.getItemAsync).mockRejectedValue(error);

      await expect(storage.find('test-key')).rejects.toThrow('Storage error');
    });
  });

  describe('save', () => {
    it('should save value successfully', async () => {
      const key = 'test-key';
      const value = 'test-value';
      vi.mocked(SecureStore.setItemAsync).mockResolvedValue(undefined);

      await storage.save(key, value);

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, value);
    });

    it('should throw error when setItemAsync fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(SecureStore.setItemAsync).mockRejectedValue(error);

      await expect(storage.save('test-key', 'test-value')).rejects.toThrow('Storage error');
    });
  });

  describe('remove', () => {
    it('should remove value successfully', async () => {
      const key = 'test-key';
      vi.mocked(SecureStore.deleteItemAsync).mockResolvedValue(undefined);

      await storage.remove(key);

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(key);
    });

    it('should throw error when deleteItemAsync fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(SecureStore.deleteItemAsync).mockRejectedValue(error);

      await expect(storage.remove('test-key')).rejects.toThrow('Storage error');
    });
  });
});