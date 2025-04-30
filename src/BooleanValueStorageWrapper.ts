import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * BooleanValueStorageWrapper provides a type-safe wrapper for storing and retrieving boolean values.
 * This class implements the StorageWrapper interface specifically for boolean values,
 * automatically handling string conversion for storage compatibility.
 * Uses '1' for true and '0' for false to minimize storage usage.
 */
export class BooleanValueStorageWrapper implements StorageWrapper<boolean> {
  private storage: Storage;
  private key: string;

  /**
   * Creates a new instance of BooleanValueStorageWrapper.
   * @param {Storage} storage - The underlying storage implementation to use
   * @param {string} key - The key under which the boolean value will be stored
   */
  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  /**
   * Finds a boolean value from storage.
   * @returns {Promise<boolean | undefined>} A promise that resolves to the stored boolean value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  async find(): Promise<boolean | undefined> {
    const storedValue = await this.storage.find(this.key);

    if (storedValue === undefined) {
      return undefined;
    }

    return storedValue === '1';
  }

  /**
   * Retrieves a boolean value from storage.
   * Unlike find(), this method throws an error if no value is found.
   *
   * @returns {Promise<boolean>} A promise that resolves to the stored boolean value
   * @throws {Error} If no value is found or if there's an error accessing the storage
   */
  async retrieve(): Promise<boolean> {
    const value = await this.find();

    if (value === undefined) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves a boolean value to storage.
   * Converts the boolean to '1' for true and '0' for false to minimize storage usage.
   *
   * @param {boolean} value - The boolean value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage
   */
  async save(value: boolean): Promise<void> {
    return this.storage.save(this.key, value ? '1' : '0');
  }

  /**
   * Removes a boolean value from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
