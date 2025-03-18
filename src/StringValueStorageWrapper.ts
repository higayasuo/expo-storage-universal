import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * StringValueStorageWrapper provides a type-safe wrapper for storing and retrieving string values.
 * This class implements the StorageWrapper interface specifically for string values,
 * providing a convenient API for working with string data in storage.
 *
 * @example
 * ```typescript
 * const storage = new WebRegularStorage();
 * const userTokenStorage = new StringValueStorageWrapper(storage, 'user-token');
 * await userTokenStorage.save('abc123');
 * const token = await userTokenStorage.retrieve();
 * ```
 */
export class StringValueStorageWrapper implements StorageWrapper<string> {
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
   * @returns {Promise<string | undefined>} A promise that resolves to the stored string value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  async find(): Promise<string | undefined> {
    return this.storage.find(this.key);
  }

  /**
   * Retrieves a string value from storage.
   * Unlike find(), this method throws an error if no value is found.
   *
   * @returns {Promise<string>} A promise that resolves to the stored string value
   * @throws {Error} If no value is found or if there's an error accessing the storage
   */
  async retrieve(): Promise<string | undefined> {
    const value = await this.storage.find(this.key);

    if (!value) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves a string value to storage.
   * @param {string} value - The string value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage
   */
  async save(value: string): Promise<void> {
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
