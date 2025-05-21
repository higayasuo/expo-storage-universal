import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * StringValueStorageWrapper provides a type-safe wrapper for storing and retrieving string values.
 * This class implements the StorageWrapper interface specifically for string values,
 * providing a convenient API for working with string data in storage.
 *
 * @template T - The specific string type to store. Must extend string.
 * @example
 * ```typescript
 * const storage = new WebRegularStorage();
 * const userTokenStorage = new StringValueStorageWrapper(storage, 'user-token');
 * await userTokenStorage.save('abc123');
 * const token = await userTokenStorage.retrieve();
 * ```
 *
 * @example
 * ```typescript
 * // Using with a specific string type
 * type UserRole = 'admin' | 'user' | 'guest';
 * const roleStorage = new StringValueStorageWrapper<UserRole>(storage, 'user-role');
 * await roleStorage.save('admin'); // Type-safe: only 'admin', 'user', or 'guest' allowed
 * const role = await roleStorage.retrieve(); // Type is UserRole
 * ```
 */
export class StringValueStorageWrapper<T extends string = string>
  implements StorageWrapper<T>
{
  protected storage: Storage;
  protected key: string;

  /**
   * Creates a new instance of StringValueStorageWrapper.
   * @param {Storage} storage - The underlying storage implementation to use
   * @param {string} key - The key under which the string value will be stored
   */
  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  /**
   * Finds a string value from storage.
   * @returns {Promise<T | undefined>} A promise that resolves to the stored string value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  async find(): Promise<T | undefined> {
    const value = await this.storage.find(this.key);
    return value as T | undefined;
  }

  /**
   * Retrieves a string value from storage.
   * Unlike find(), this method throws an error if no value is found.
   *
   * @returns {Promise<T>} A promise that resolves to the stored string value
   * @throws {Error} If no value is found or if there's an error accessing the storage
   */
  async retrieve(): Promise<T> {
    const value = await this.find();

    if (!value) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves a string value to storage.
   * @param {T} value - The string value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage
   */
  async save(value: T): Promise<void> {
    return this.storage.save(this.key, value);
  }

  /**
   * Removes a string value from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
