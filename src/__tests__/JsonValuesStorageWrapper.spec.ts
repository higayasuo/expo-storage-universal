import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JsonValuesStorageWrapper } from '../JsonValuesStorageWrapper';
import { Storage } from '../Storage';

interface TestData {
  id: number;
  name: string;
  active: boolean;
}

describe('JsonValuesStorageWrapper', () => {
  let mockStorage: Storage;
  let wrapper: JsonValuesStorageWrapper<TestData>;
  const testKey = 'test-key';
  const testData: TestData[] = [
    { id: 1, name: 'John', active: true },
    { id: 2, name: 'Jane', active: false },
    { id: 3, name: 'Bob', active: true },
  ];

  const compareById = (a: TestData, b: TestData) => a.id - b.id;

  beforeEach(() => {
    mockStorage = {
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    };
    wrapper = new JsonValuesStorageWrapper<TestData>(
      mockStorage,
      testKey,
      compareById,
    );
  });

  describe('addItem', () => {
    it('should add an item to an empty array', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(undefined);
      const newItem = { id: 1, name: 'John', active: true };
      await wrapper.addItem(newItem);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify([newItem]),
      );
    });

    it('should add an item to an existing array', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(
        JSON.stringify([testData[0]]),
      );
      const newItem = testData[1];
      await wrapper.addItem(newItem);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify([testData[0], newItem]),
      );
    });
  });

  describe('updateItem', () => {
    it('should update an existing item', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const updatedItem = { ...testData[0], name: 'Johnny' };
      await wrapper.updateItem(updatedItem);
      const expectedData = [updatedItem, testData[1], testData[2]];
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(expectedData),
      );
    });

    it('should throw an error when item is not found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const nonExistentItem = { id: 999, name: 'Unknown', active: true };
      await expect(wrapper.updateItem(nonExistentItem)).rejects.toThrow(
        'Item not found in storage. The item may have been deleted or the comparison function may not match any existing items.',
      );
    });
  });

  describe('updateItems', () => {
    it('should update multiple existing items', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const updatedItems = [
        { ...testData[0], name: 'Johnny' },
        { ...testData[2], name: 'Bobby' },
      ];
      await wrapper.updateItems(updatedItems);
      const expectedData = [updatedItems[0], testData[1], updatedItems[1]];
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(expectedData),
      );
    });

    it('should handle empty update array', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      await wrapper.updateItems([]);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(testData),
      );
    });
  });

  describe('removeItem', () => {
    it('should remove an existing item', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      await wrapper.removeItem(testData[1]);
      const expectedData = [testData[0], testData[2]];
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(expectedData),
      );
    });

    it('should do nothing when item is not found', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const nonExistentItem = { id: 999, name: 'Unknown', active: true };
      await wrapper.removeItem(nonExistentItem);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(testData),
      );
    });
  });

  describe('removeItems', () => {
    it('should remove multiple existing items', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const itemsToRemove = [testData[0], testData[2]];
      await wrapper.removeItems(itemsToRemove);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify([testData[1]]),
      );
    });

    it('should handle empty remove array', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      await wrapper.removeItems([]);
      expect(mockStorage.save).toHaveBeenCalledWith(
        testKey,
        JSON.stringify(testData),
      );
    });
  });

  describe('getItemsByFilter', () => {
    it('should return filtered items', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const activeItems = await wrapper.getItemsByFilter((item) => item.active);
      expect(activeItems).toEqual([testData[0], testData[2]]);
    });

    it('should return empty array when no items match filter', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const filteredItems = await wrapper.getItemsByFilter(
        (item) => item.id > 999,
      );
      expect(filteredItems).toEqual([]);
    });
  });

  describe('sortItems', () => {
    it('should return sorted items using default comparison', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const sortedItems = await wrapper.sortItems();
      expect(sortedItems).toEqual([testData[0], testData[1], testData[2]]);
    });

    it('should return sorted items using custom comparison', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      const sortedItems = await wrapper.sortItems((a, b) =>
        a.name.localeCompare(b.name),
      );
      expect(sortedItems).toEqual([testData[2], testData[1], testData[0]]);
    });

    it('should not modify the original array', async () => {
      vi.mocked(mockStorage.find).mockResolvedValue(JSON.stringify(testData));
      await wrapper.sortItems((a, b) => a.name.localeCompare(b.name));
      expect(mockStorage.save).not.toHaveBeenCalled();
    });
  });
});
