import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StringValueStorageWrapper } from '../StringValueStorageWrapper';
import { Storage } from '../Storage';

describe('StringValueStorageWrapper', () => {
  let storage: Storage;
  let wrapper: StringValueStorageWrapper;
  const testKey = 'test-key';

  beforeEach(() => {
    storage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new StringValueStorageWrapper(storage, testKey);
  });

  describe('find', () => {
    it('should return the value when found', async () => {
      const mockValue = 'test-value';
      vi.mocked(storage.find).mockResolvedValue(mockValue);

      const result = await wrapper.find();

      expect(result).toBe(mockValue);
      expect(storage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return undefined when no value is found', async () => {
      vi.mocked(storage.find).mockResolvedValue(undefined);

      const result = await wrapper.find();

      expect(result).toBeUndefined();
      expect(storage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw error when storage.find fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(storage.find).mockRejectedValue(error);

      await expect(wrapper.find()).rejects.toThrow('Storage error');
    });
  });

  describe('retrieve', () => {
    it('should return the value when found', async () => {
      const mockValue = 'test-value';
      vi.mocked(storage.find).mockResolvedValue(mockValue);

      const result = await wrapper.retrieve();

      expect(result).toBe(mockValue);
      expect(storage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw error when no value is found', async () => {
      vi.mocked(storage.find).mockResolvedValue(undefined);

      await expect(wrapper.retrieve()).rejects.toThrow(`No value found for key ${testKey}`);
    });

    it('should throw error when storage.find fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(storage.find).mockRejectedValue(error);

      await expect(wrapper.retrieve()).rejects.toThrow('Storage error');
    });
  });

  describe('save', () => {
    it('should save the value successfully', async () => {
      const value = 'test-value';
      vi.mocked(storage.save).mockResolvedValue(undefined);

      await wrapper.save(value);

      expect(storage.save).toHaveBeenCalledWith(testKey, value);
    });

    it('should throw error when storage.save fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(storage.save).mockRejectedValue(error);

      await expect(wrapper.save('test-value')).rejects.toThrow('Storage error');
    });
  });

  describe('remove', () => {
    it('should remove the value successfully', async () => {
      vi.mocked(storage.remove).mockResolvedValue(undefined);

      await wrapper.remove();

      expect(storage.remove).toHaveBeenCalledWith(testKey);
    });

    it('should throw error when storage.remove fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(storage.remove).mockRejectedValue(error);

      await expect(wrapper.remove()).rejects.toThrow('Storage error');
    });
  });
});