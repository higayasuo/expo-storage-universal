import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NumberValueStorageWrapper } from '../NumberValueStorageWrapper';
import { Storage } from '../Storage';

describe('NumberValueStorageWrapper', () => {
  let mockStorage: Storage;
  let wrapper: NumberValueStorageWrapper;
  const testKey = 'test-key';

  beforeEach(() => {
    mockStorage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new NumberValueStorageWrapper(mockStorage, testKey);
  });

  describe('find', () => {
    it('should return undefined when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      const result = await wrapper.find();
      expect(result).toBeUndefined();
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return a number when a valid string value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('42');
      const result = await wrapper.find();
      expect(result).toBe(42);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return NaN when an invalid string value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('not-a-number');
      const result = await wrapper.find();
      expect(result).toBeNaN();
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });
  });

  describe('retrieve', () => {
    it('should return the number value when found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('42');
      const result = await wrapper.retrieve();
      expect(result).toBe(42);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw an error when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      await expect(wrapper.retrieve()).rejects.toThrow(
        `No value found for key ${testKey}`,
      );
    });
  });

  describe('save', () => {
    it('should save the number as a string', async () => {
      const testValue = 42;
      await wrapper.save(testValue);
      expect(mockStorage.save).toHaveBeenCalledWith(testKey, '42');
    });

    it('should handle NaN values', async () => {
      const testValue = NaN;
      await wrapper.save(testValue);
      expect(mockStorage.save).toHaveBeenCalledWith(testKey, 'NaN');
    });

    it('should handle Infinity values', async () => {
      const testValue = Infinity;
      await wrapper.save(testValue);
      expect(mockStorage.save).toHaveBeenCalledWith(testKey, 'Infinity');
    });
  });

  describe('remove', () => {
    it('should call remove on the storage with the correct key', async () => {
      await wrapper.remove();
      expect(mockStorage.remove).toHaveBeenCalledWith(testKey);
    });
  });
});
