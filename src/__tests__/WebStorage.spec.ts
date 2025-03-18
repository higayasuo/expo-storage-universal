import { describe, it, expect, beforeEach } from 'vitest';
import { WebStorage } from '../WebStorage';

beforeEach(() => {
  // Clear sessionStorage before each test
  sessionStorage.clear();
});

describe('WebStorage', () => {
  describe('Regular storage operations', () => {
    it('should get a value from storage', async () => {
      const storage = new WebStorage();
      const testValue = 'testValue';

      await storage.saveToStorage('testKey', testValue);

      const result = await storage.findFromStorage('testKey');

      expect(result).toEqual(testValue);
    });

    it('should save a value to storage with regular prefix', async () => {
      const storage = new WebStorage();
      const testValue = 'test value';

      await storage.saveToStorage('testKey', testValue);

      const result = sessionStorage.getItem('regular_testKey');
      expect(result).toEqual(testValue);
    });

    it('should remove a value from storage', async () => {
      const storage = new WebStorage();
      const testValue = 'test value';

      // First save a value
      await storage.saveToStorage('testKey', testValue);

      // Verify it's there
      const beforeDelete = await storage.findFromStorage('testKey');
      expect(beforeDelete).toEqual(testValue);

      // Delete it
      await storage.removeFromStorage('testKey');

      // Verify it's gone
      const afterDelete = await storage.findFromStorage('testKey');
      expect(afterDelete).toBeUndefined();
    });

    it('should return undefined for non-existent keys', async () => {
      const storage = new WebStorage();

      const result = await storage.findFromStorage('nonExistentKey');

      expect(result).toBeUndefined();
    });
  });

  describe('Web-based secure storage operations (Note: uses sessionStorage, not truly secure)', () => {
    it('should get a value from web secure storage', async () => {
      const storage = new WebStorage();
      const testValue = 'secure value';

      await storage.saveToSecureStorage('secureKey', testValue);

      const result = await storage.findFromSecureStorage('secureKey');

      expect(result).toEqual(testValue);
    });

    it('should save a value to web secure storage with secure prefix', async () => {
      const storage = new WebStorage();
      const testValue = 'secure test value';

      await storage.saveToSecureStorage('secureKey', testValue);

      const result = sessionStorage.getItem('secure_secureKey');
      expect(result).toEqual(testValue);
    });

    it('should remove a value from web secure storage', async () => {
      const storage = new WebStorage();
      const testValue = 'secure test value';

      // First save a value
      await storage.saveToSecureStorage('secureKey', testValue);

      // Verify it's there
      const beforeDelete = await storage.findFromSecureStorage('secureKey');
      expect(beforeDelete).toEqual(testValue);

      // Delete it
      await storage.removeFromSecureStorage('secureKey');

      // Verify it's gone
      const afterDelete = await storage.findFromSecureStorage('secureKey');
      expect(afterDelete).toBeUndefined();
    });

    it('should return undefined for non-existent secure keys', async () => {
      const storage = new WebStorage();

      const result = await storage.findFromSecureStorage('nonExistentKey');

      expect(result).toBeUndefined();
    });
  });

  describe('Storage isolation', () => {
    it('should keep regular and web secure storage separate using different prefixes', async () => {
      const storage = new WebStorage();

      // Save values to both storages
      await storage.saveToStorage('regularKey', 'regular value');
      await storage.saveToSecureStorage('secureKey', 'secure value');

      // Verify both values are stored correctly
      expect(await storage.findFromStorage('regularKey')).toBe('regular value');
      expect(await storage.findFromSecureStorage('secureKey')).toBe('secure value');

      // Values should be isolated - regular storage shouldn't see secure values and vice versa
      expect(await storage.findFromStorage('secureKey')).toBeUndefined();
      expect(await storage.findFromSecureStorage('regularKey')).toBeUndefined();
    });
  });
});
