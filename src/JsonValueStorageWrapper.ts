import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * JsonValueStorageWrapper provides a type-safe wrapper for storing and retrieving JSON values.
 * This class implements the StorageWrapper interface specifically for JSON data,
 * automatically handling JSON serialization/deserialization for storage compatibility.
 */
export class JsonValueStorageWrapper<T> implements StorageWrapper<T> {
  private storage: Storage;
  private key: string;

  /**
   * Creates a new instance of JsonValueStorageWrapper.
   * @param {Storage} storage - The underlying storage implementation to use
   * @param {string} key - The key under which the JSON value will be stored
   */
  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  /**
   * Finds a JSON value from storage.
   * @returns {Promise<T | undefined>} A promise that resolves to the stored JSON value or undefined if not found
   * @throws {Error} If there's an error accessing the storage or parsing the JSON
   */
  async find(): Promise<T | undefined> {
    const storedValue = await this.storage.find(this.key);

    if (storedValue === undefined) {
      return undefined;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch (error) {
      throw new Error(
        `Failed to parse JSON for key ${this.key}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Retrieves a JSON value from storage.
   * Unlike find(), this method throws an error if no value is found.
   *
   * @returns {Promise<T>} A promise that resolves to the stored JSON value
   * @throws {Error} If no value is found, if there's an error accessing the storage, or if parsing fails
   */
  async retrieve(): Promise<T> {
    const value = await this.find();

    if (value === undefined) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves a JSON value to storage.
   * Converts the value to a JSON string before saving to ensure compatibility with storage.
   *
   * @param {T} value - The JSON value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage or if serialization fails
   */
  async save(value: T): Promise<void> {
    try {
      const jsonString = JSON.stringify(value);
      return this.storage.save(this.key, jsonString);
    } catch (error) {
      throw new Error(
        `Failed to stringify JSON for key ${this.key}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Removes a JSON value from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
