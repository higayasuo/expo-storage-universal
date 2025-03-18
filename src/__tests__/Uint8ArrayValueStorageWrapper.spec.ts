import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Uint8ArrayValueStorageWrapper } from '../Uint8ArrayValueStorageWrapper';
import { Storage } from '../Storage';
import base64 from 'base64-js';

describe('Uint8ArrayValueStorageWrapper', () => {
  let storage: Storage;
  let wrapper: Uint8ArrayValueStorageWrapper;
  const testKey = 'test-key';

  beforeEach(() => {
    storage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new Uint8ArrayValueStorageWrapper(storage, testKey);
  });

  describe('find', () => {
    it('should return the decoded Uint8Array when found', async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const encodedData = base64.fromByteArray(testData);
      vi.mocked(storage.find).mockResolvedValue(encodedData);

      const result = await wrapper.find();

      expect(result).toEqual(testData);
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
    it('should return the decoded Uint8Array when found', async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const encodedData = base64.fromByteArray(testData);
      vi.mocked(storage.find).mockResolvedValue(encodedData);

      const result = await wrapper.retrieve();

      expect(result).toEqual(testData);
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
    it('should save the encoded Uint8Array successfully', async () => {
      const testData = new Uint8Array([1, 2, 3, 4, 5]);
      const expectedEncodedData = base64.fromByteArray(testData);
      vi.mocked(storage.save).mockResolvedValue(undefined);

      await wrapper.save(testData);

      expect(storage.save).toHaveBeenCalledWith(testKey, expectedEncodedData);
    });

    it('should throw error when storage.save fails', async () => {
      const error = new Error('Storage error');
      vi.mocked(storage.save).mockRejectedValue(error);

      await expect(wrapper.save(new Uint8Array([1, 2, 3]))).rejects.toThrow('Storage error');
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