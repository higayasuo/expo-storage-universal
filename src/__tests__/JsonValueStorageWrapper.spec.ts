import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JsonValueStorageWrapper } from '../JsonValueStorageWrapper';
import { Storage } from '../Storage';

interface TestData {
  id: number;
  name: string;
  active: boolean;
}

describe('JsonValueStorageWrapper', () => {
  let mockStorage: Storage;
  let wrapper: JsonValueStorageWrapper<TestData>;
  const testKey = 'test-key';
  const testData: TestData = {
    id: 1,
    name: 'Test',
    active: true,
  };

  beforeEach(() => {
    mockStorage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new JsonValueStorageWrapper<TestData>(mockStorage, testKey);
  });

  describe('find', () => {
    it('should return undefined when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      const result = await wrapper.find();
      expect(result).toBeUndefined();
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should return parsed JSON when valid JSON is found', async () => {
      const jsonString = JSON.stringify(testData);
      vi.mocked(mockStorage.find).mockResolvedValue(jsonString);
      const result = await wrapper.find();
      expect(result).toEqual(testData);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw an error when invalid JSON is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('invalid json');
      await expect(wrapper.find()).rejects.toThrow('Failed to parse JSON');
    });
  });

  describe('retrieve', () => {
    it('should return the parsed JSON value when found', async () => {
      const jsonString = JSON.stringify(testData);
      vi.mocked(mockStorage.find).mockResolvedValue(jsonString);
      const result = await wrapper.retrieve();
      expect(result).toEqual(testData);
      expect(mockStorage.find).toHaveBeenCalledWith(testKey);
    });

    it('should throw an error when no value is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      await expect(wrapper.retrieve()).rejects.toThrow(
        `No value found for key ${testKey}`,
      );
    });

    it('should throw an error when invalid JSON is found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue('invalid json');
      await expect(wrapper.retrieve()).rejects.toThrow('Failed to parse JSON');
    });
  });

  describe('save', () => {
    it('should save the JSON value as a string', async () => {
      await wrapper.save(testData);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(testData),
      );
    });

    it('should throw an error when JSON serialization fails', async () => {
      const circularObject: any = { self: null };
      circularObject.self = circularObject;
      await expect(wrapper.save(circularObject)).rejects.toThrow(
        'Failed to stringify JSON',
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
