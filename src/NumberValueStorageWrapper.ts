import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * NumberValueStorageWrapper provides a type-safe wrapper for storing and retrieving number values.
 * This class implements the StorageWrapper interface specifically for number values,
 * automatically handling base64 encoding/decoding for storage compatibility.
 *
 */
export class NumberValueStorageWrapper implements StorageWrapper<number> {
  private storage: Storage;
  private key: string;

  /**
   * Creates a new instance of NumberValueStorageWrapper.
   * @param {Storage} storage - The underlying storage implementation to use
   * @param {string} key - The key under which the number value will be stored
   */
  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  /**
   * Finds a number value from storage.
   * @returns {Promise<number | undefined>} A promise that resolves to the stored number value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  async find(): Promise<number | undefined> {
    const storedValue = await this.storage.find(this.key);

    if (storedValue === undefined) {
      return undefined;
    }

    return Number(storedValue);
  }

  /**
   * Retrieves a number value from storage.
   * Unlike find(), this method throws an error if no value is found.
   *
   * @returns {Promise<number>} A promise that resolves to the stored number value
   * @throws {Error} If no value is found or if there's an error accessing the storage
   */
  async retrieve(): Promise<number> {
    const value = await this.find();

    if (!value) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves a number value to storage.
   * Converts the number to a string before saving to ensure compatibility with storage.
   *
   * @param {number} value - The number value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage
   */
  async save(value: number): Promise<void> {
    return this.storage.save(this.key, value.toString());
  }

  /**
   * Removes a number value from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
