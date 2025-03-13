import { Storage } from './Storage';

/**
 * WebStorage class implementing the Storage interface for web platforms.
 * Uses sessionStorage for regular and secure storage operations with different prefixes.
 */
export class WebStorage implements Storage {
  private readonly SECURE_PREFIX = 'secure_';
  private readonly REGULAR_PREFIX = 'regular_';

  /**
   * Creates a new instance of WebStorage.
   */
  constructor() {}

  /**
   * Retrieves a value from regular storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<string | undefined>} - A promise that resolves to the retrieved value or undefined if not found.
   */
  async getFromStorage(key: string): Promise<string | undefined> {
    return sessionStorage.getItem(this.REGULAR_PREFIX + key) ?? undefined;
  }

  /**
   * Saves a value to regular storage.
   * @param {string} key - The key under which the value should be stored.
   * @param {string} value - The value to store.
   * @returns {Promise<void>} - A promise that resolves when the value has been saved.
   */
  async saveToStorage(key: string, value: string): Promise<void> {
    sessionStorage.setItem(this.REGULAR_PREFIX + key, value);
  }

  /**
   * Removes a value from regular storage.
   * @param {string} key - The key of the item to remove.
   * @returns {Promise<void>} - A promise that resolves when the value has been removed.
   */
  async removeFromStorage(key: string): Promise<void> {
    sessionStorage.removeItem(this.REGULAR_PREFIX + key);
  }

  /**
   * Retrieves a value from secure storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<string | undefined>} - A promise that resolves to the retrieved value or undefined if not found.
   */
  async getFromSecureStorage(key: string): Promise<string | undefined> {
    return sessionStorage.getItem(this.SECURE_PREFIX + key) ?? undefined;
  }

  /**
   * Saves a value to secure storage.
   * @param {string} key - The key under which the value should be stored.
   * @param {string} value - The value to store.
   * @returns {Promise<void>} - A promise that resolves when the value has been saved.
   */
  async saveToSecureStorage(key: string, value: string): Promise<void> {
    sessionStorage.setItem(this.SECURE_PREFIX + key, value);
  }

  /**
   * Removes a value from secure storage.
   * @param {string} key - The key of the item to remove.
   * @returns {Promise<void>} - A promise that resolves when the value has been removed.
   */
  async removeFromSecureStorage(key: string): Promise<void> {
    sessionStorage.removeItem(this.SECURE_PREFIX + key);
  }
}
