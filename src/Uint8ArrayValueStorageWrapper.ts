import base64 from 'base64-js';

import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

/**
 * Uint8ArrayValueStorageWrapper provides a type-safe wrapper for storing and retrieving binary data.
 * This class implements the StorageWrapper interface specifically for Uint8Array values,
 * automatically handling base64 encoding/decoding for storage compatibility.
 *
 * @example
 * ```typescript
 * const storage = new WebRegularStorage();
 * const binaryStorage = new Uint8ArrayValueStorageWrapper(storage, 'binary-data');
 * const data = new Uint8Array([1, 2, 3, 4, 5]);
 * await binaryStorage.save(data);
 * const retrievedData = await binaryStorage.retrieve();
 * ```
 */
export class Uint8ArrayValueStorageWrapper implements StorageWrapper<Uint8Array> {
  private storage: Storage;
  private key: string;

  /**
   * Creates a new instance of Uint8ArrayValueStorageWrapper.
   * @param {Storage} storage - The underlying storage implementation to use
   * @param {string} key - The key under which the binary data will be stored
   */
  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  /**
   * Finds binary data from storage.
   * Automatically decodes the stored base64 string back to Uint8Array.
   *
   * @returns {Promise<Uint8Array | undefined>} A promise that resolves to the stored binary data or undefined if not found
   * @throws {Error} If there's an error accessing the storage or decoding the data
   */
  async find(): Promise<Uint8Array | undefined> {
    const storedValue = await this.storage.find(this.key);

    if (!storedValue) {
      return undefined;
    }

    return base64.toByteArray(storedValue);
  }

  /**
   * Retrieves binary data from storage.
   * Unlike find(), this method throws an error if no value is found.
   * Automatically decodes the stored base64 string back to Uint8Array.
   *
   * @returns {Promise<Uint8Array>} A promise that resolves to the stored binary data
   * @throws {Error} If no value is found or if there's an error accessing/decoding the storage
   */
  async retrieve(): Promise<Uint8Array> {
    const value = await this.find();

    if (!value) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  /**
   * Saves binary data to storage.
   * Automatically encodes the Uint8Array to base64 for storage.
   *
   * @param {Uint8Array} value - The binary data to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage or encoding the data
   */
  async save(value: Uint8Array): Promise<void> {
    return this.storage.save(this.key, base64.fromByteArray(value));
  }

  /**
   * Removes binary data from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
