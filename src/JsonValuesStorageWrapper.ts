import { JsonValueStorageWrapper, Storage } from 'expo-storage-universal';

/**
 * Type definition for comparing two items of type T.
 * @template T - The type of items to compare
 * @param itemA - The first item to compare
 * @param itemB - The second item to compare
 * @returns A number indicating the comparison result:
 *          - Negative if itemA < itemB
 *          - Zero if itemA === itemB
 *          - Positive if itemA > itemB
 */
export type CompareItem<T> = (itemA: T, itemB: T) => number;

/**
 * Type definition for filtering items of type T.
 * @template T - The type of items to filter
 * @param item - The item to evaluate
 * @returns true if the item should be included, false otherwise
 */
export type FilterItem<T> = (item: T) => boolean;

/**
 * JsonValuesStorageWrapper provides a type-safe wrapper for storing and retrieving arrays of JSON values.
 * This class extends JsonValueStorageWrapper to handle arrays of items, providing additional methods
 * for managing collections of data with filtering, sorting, and item manipulation capabilities.
 *
 * @template T - The type of items stored in the array
 *
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * const storage = new WebRegularStorage();
 * const compareItem: CompareItem<User> = (a, b) => a.id.localeCompare(b.id);
 * const usersStorage = new JsonValuesStorageWrapper<User>(storage, 'users', compareItem);
 *
 * const user = { id: 1, name: 'John' };
 *
 * // Add a new user
 * await usersStorage.addItem(user);
 *
 * // Update a user
 * user.name = 'John Doe';
 * await usersStorage.updateItem(user);
 *
 * // Remove a user
 * await usersStorage.removeItem(user);
 *
 * // Get all users
 * const users = await usersStorage.find();
 *
 * // Filter users
 * const activeUsers = await usersStorage.getItemsByFilter(user => user.active);
 *
 * // Sort users by name
 * const sortedUsers = await usersStorage.sortItems((a, b) => a.name.localeCompare(b.name));
 * ```
 */
export class JsonValuesStorageWrapper<T> extends JsonValueStorageWrapper<T[]> {
  protected compareItem: CompareItem<T>;

  /**
   * Creates a new instance of JsonValuesStorageWrapper.
   * @param storage - The underlying storage implementation to use
   * @param key - The key under which the array of values will be stored
   * @param compareItem - The comparison function to use for sorting and filtering
   */
  constructor(storage: Storage, key: string, compareItem: CompareItem<T>) {
    super(storage, key);
    this.compareItem = compareItem;
  }

  /**
   * Adds a new item to the stored array.
   * If no array exists, creates a new array with the item.
   *
   * @param item - The item to add to the array
   * @returns A promise that resolves when the item has been added
   */
  async addItem(item: T) {
    const items = (await this.find()) ?? [];
    items.push(item);
    await this.save(items);
  }

  /**
   * Adds multiple items to the stored array.
   * If no array exists, creates a new array with the items.
   *
   * @param items - The items to add to the array
   * @returns A promise that resolves when the items have been added
   */
  async addItems(items: T[]) {
    const currentItems = (await this.find()) ?? [];
    await this.save([...currentItems, ...items]);
  }

  /**
   * Updates an existing item in the stored array.
   * This method uses the provided comparison function to identify the item to update.
   *
   * @param item - The updated item to save
   * @returns A promise that resolves when the item has been updated
   * @throws {Error} If the item is not found or if there's an error accessing the storage
   */
  async updateItem(item: T) {
    const items = (await this.find()) ?? [];
    const index = items.findIndex((i) => this.compareItem(i, item) === 0);
    if (index !== -1) {
      items[index] = item;
    } else {
      throw new Error(
        'Item not found in storage. The item may have been deleted or the comparison function may not match any existing items.',
      );
    }
    await this.save(items);
  }

  /**
   * Updates existing items in the stored array.
   * This method iterates through the current items in storage and updates them if a match is found in the provided items array.
   * The comparison function is used to identify items that need to be updated.
   *
   * @param items - The items to update in the array. These items will replace existing items in storage if a match is found.
   * @returns A promise that resolves when the items have been updated in storage.
   * @throws {Error} If there's an error accessing the storage, such as a failure to read or write data.
   */
  async updateItems(items: T[]) {
    const currentItems = (await this.find()) ?? [];
    currentItems.forEach((item, outerIndex) => {
      const innerIndex = items.findIndex(
        (i) => this.compareItem(i, item) === 0,
      );
      if (innerIndex !== -1) {
        currentItems[outerIndex] = items[innerIndex];
      }
    });
    await this.save(currentItems);
  }

  /**
   * Removes an item from the stored array.
   * This method uses the class's internal comparison function to identify the item to remove.
   *
   * @param item - The item to remove from the array
   * @returns A promise that resolves when the item has been removed
   * @throws {Error} If the item is not found or if there's an error accessing the storage
   */
  async removeItem(item: T) {
    const items = (await this.find()) ?? [];
    const index = items.findIndex((i) => this.compareItem(i, item) === 0);
    if (index !== -1) {
      items.splice(index, 1);
    }
    await this.save(items);
  }

  /**
   * Removes items from the stored array.
   * This method iterates through the provided items array and removes each item from the stored array if a match is found using the class's internal comparison function.
   *
   * @param items - The items to remove from the array
   * @returns A promise that resolves when the items have been removed
   * @throws {Error} If there's an error accessing the storage
   */
  async removeItems(items: T[]) {
    const currentItems = (await this.find()) ?? [];
    items.forEach((item) => {
      const index = currentItems.findIndex(
        (i) => this.compareItem(i, item) === 0,
      );
      if (index !== -1) {
        currentItems.splice(index, 1);
      }
    });
    await this.save(currentItems);
  }

  /**
   * Retrieves items from the stored array that match the provided filter.
   *
   * @param filterItem - Function to filter items
   * @returns A promise that resolves to an array of items matching the filter
   * @throws {Error} If there's an error accessing the storage
   */
  async getItemsByFilter(filterItem: FilterItem<T>) {
    const items = (await this.find()) ?? [];
    return items.filter(filterItem);
  }

  /**
   * Sorts the stored array using the provided comparison function.
   * Returns a new sorted array without modifying the stored array.
   *
   * @param compareItem - Function to compare items for sorting
   * @returns A promise that resolves to a sorted array of items
   * @throws {Error} If there's an error accessing the storage
   */
  async sortItems(compareItem?: CompareItem<T>) {
    const items = (await this.find()) ?? [];
    return items.sort(compareItem ?? this.compareItem);
  }
}
