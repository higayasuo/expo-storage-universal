import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DateValueStorageWrapper } from '../DateValueStorageWrapper';
import { Storage } from '../Storage';

describe('DateValueStorageWrapper', () => {
  let mockStorage: Storage;
  let wrapper: DateValueStorageWrapper;
  const testKey = 'test-key';
  const testDate = new Date('2024-03-18T12:00:00Z');
  const testTimestamp = testDate.getTime().toString();

  beforeEach(() => {
    mockStorage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new DateValueStorageWrapper(mockStorage, testKey);
  });

  describe('find', () => {
    it('should return undefined when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      const result = await wrapper.find();
      expect(result).toBeUndefined();
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return Date when valid timestamp is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(testTimestamp);
      const result = await wrapper.find();
      expect(result).toBeInstanceOf(Date);
      expect(result?.getTime()).toBe(testDate.getTime());
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw an error when invalid timestamp is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('invalid-timestamp');
      await expect(wrapper.find()).rejects.toThrow('Invalid timestamp value');
    });
  });

  describe('retrieve', () => {
    it('should return the Date value when found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(testTimestamp);
      const result = await wrapper.retrieve();
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(testDate.getTime());
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw an error when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      await expect(wrapper.retrieve()).rejects.toThrow(
        `No value found for key ${testKey}`,
      );
    });

    it('should throw an error when invalid timestamp is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('invalid-timestamp');
      await expect(wrapper.retrieve()).rejects.toThrow(
        'Invalid timestamp value',
      );
    });
  });

  describe('save', () => {
    it('should save the Date as a timestamp string', async () => {
      await wrapper.save(testDate);
      expect(mockStorage.save).toHaveBeenCalledWith(testKey, testTimestamp);
    });

    it('should throw an error when non-Date value is provided', async () => {
      await expect(wrapper.save('not-a-date' as any)).rejects.toThrow(
        'Invalid Date value',
      );
    });
  });

  describe('remove', () => {
    it('should call remove on the storage with the correct key', async () => {
      await wrapper.remove();
      expect(mockStorage.remove).toHaveBeenCalledWith(testKey);
    });
  });
});
