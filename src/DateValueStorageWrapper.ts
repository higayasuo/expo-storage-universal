import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * DateValueStorageWrapper provides a type-safe wrapper for storing and retrieving Date values.
 * This class implements the StorageWrapper interface specifically for Date values,
 * automatically handling conversion between Date and number (timestamp) for storage compatibility.
 * Uses getTime() to store dates as numbers to minimize storage usage and avoid parsing overhead.
 */
export class DateValueStorageWrapper implements StorageWrapper<Date> {
  private storage: Storage;
  private key: string;

  /**
   * Creates a new instance of DateValueStorageWrapper.
   * @param {Storage} storage - The underlying storage implementation to use
   * @param {string} key - The key under which the Date value will be stored
   */
  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  /**
   * Finds a Date value from storage.
   * @returns {Promise<Date | undefined>} A promise that resolves to the stored Date value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  async find(): Promise<Date | undefined> {
    const storedValue = await this.storage.find(this.key);

    if (storedValue === undefined) {
      return undefined;
    }

    const timestamp = Number(storedValue);
    if (isNaN(timestamp)) {
      throw new Error(`Invalid timestamp value stored for key ${this.key}`);
    }

    return new Date(timestamp);
  }

  /**
   * Retrieves a Date value from storage.
   * Unlike find(), this method throws an error if no value is found.
   *
   * @returns {Promise<Date>} A promise that resolves to the stored Date value
   * @throws {Error} If no value is found or if there's an error accessing the storage
   */
  async retrieve(): Promise<Date> {
    const value = await this.find();

    if (value === undefined) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves a Date value to storage.
   * Converts the Date to a timestamp (number) before saving to ensure compatibility with storage.
   *
   * @param {Date} value - The Date value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage
   */
  async save(value: Date): Promise<void> {
    if (!(value instanceof Date)) {
      throw new Error(`Invalid Date value provided for key ${this.key}`);
    }

    return this.storage.save(this.key, value.getTime().toString());
  }

  /**
   * Removes a Date value from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
