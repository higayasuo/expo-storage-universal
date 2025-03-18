import { describe, it, expect, beforeEach } from 'vitest';
import { WebRegularStorage } from '../WebRegularStorage';

beforeEach(() => {
  // Clear sessionStorage before each test
  sessionStorage.clear();
});

describe('WebRegularStorage', () => {
  describe('Storage operations', () => {
    it('should find a value from storage', async () => {
      const storage = new WebRegularStorage();
      const testValue = 'testValue';

      await storage.save('testKey', testValue);

      const result = await storage.find('testKey');

      expect(result).toEqual(testValue);
    });

    it('should save a value to storage with regular prefix', async () => {
      const storage = new WebRegularStorage();
      const testValue = 'test value';

      await storage.save('testKey', testValue);

      const result = sessionStorage.getItem('regular_testKey');
      expect(result).toEqual(testValue);
    });

    it('should remove a value from storage', async () => {
      const storage = new WebRegularStorage();
      const testValue = 'test value';

      // First save a value
      await storage.save('testKey', testValue);

      // Verify it's there
      const beforeDelete = await storage.find('testKey');
      expect(beforeDelete).toEqual(testValue);

      // Delete it
      await storage.remove('testKey');

      // Verify it's gone
      const afterDelete = await storage.find('testKey');
      expect(afterDelete).toBeUndefined();
    });

    it('should return undefined for non-existent keys', async () => {
      const storage = new WebRegularStorage();

      const result = await storage.find('nonExistentKey');

      expect(result).toBeUndefined();
    });
  });
});