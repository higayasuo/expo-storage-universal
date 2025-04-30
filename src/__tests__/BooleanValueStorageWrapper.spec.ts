import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BooleanValueStorageWrapper } from '../BooleanValueStorageWrapper';
import { Storage } from '../Storage';

describe('BooleanValueStorageWrapper', () => {
  let mockStorage: Storage;
  let wrapper: BooleanValueStorageWrapper;
  const testKey = 'test-key';

  beforeEach(() => {
    mockStorage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new BooleanValueStorageWrapper(mockStorage, testKey);
  });

  describe('find', () => {
    it('should return undefined when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      const result = await wrapper.find();
      expect(result).toBeUndefined();
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return true when "1" is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('1');
      const result = await wrapper.find();
      expect(result).toBe(true);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return false when "0" is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('0');
      const result = await wrapper.find();
      expect(result).toBe(false);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return false for any value other than "1"', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('2');
      const result = await wrapper.find();
      expect(result).toBe(false);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });
  });

  describe('retrieve', () => {
    it('should return the boolean value when found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('1');
      const result = await wrapper.retrieve();
      expect(result).toBe(true);
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
    it('should save true as "1"', async () => {
      await wrapper.save(true);
      expect(mockStorage.save).toHaveBeenCalledWith(testKey, '1');
    });

    it('should save false as "0"', async () => {
      await wrapper.save(false);
      expect(mockStorage.save).toHaveBeenCalledWith(testKey, '0');
    });
  });

  describe('remove', () => {
    it('should call remove on the storage with the correct key', async () => {
      await wrapper.remove();
      expect(mockStorage.remove).toHaveBeenCalledWith(testKey);
    });
  });
});
