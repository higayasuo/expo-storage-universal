import { Storage } from './Storage';

/**
 * WebSecureStorage class implementing the Storage interface for web platforms.
 * Utilizes sessionStorage with secure prefix for sensitive data storage in browsers.
 * Note: This is not truly secure as sessionStorage is not encrypted. For truly
 * secure storage, use NativeSecureStorage on native platforms.
 */
export class WebSecureStorage implements Storage {
  private readonly PREFIX = 'secure_';

  /**
   * Creates a new instance of WebSecureStorage.
   */
  constructor() {}

  /**
   * Retrieves a value from sessionStorage with secure prefix.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<string | undefined>} - A promise that resolves to the retrieved value or undefined if not found.
   * @example
   * const token = await storage.find('authToken');
   */
  async find(key: string): Promise<string | undefined> {
    return sessionStorage.getItem(this.PREFIX + key) ?? undefined;
  }

  /**
   * Saves a value to sessionStorage with secure prefix.
   * @param {string} key - The key under which the value should be stored.
   * @param {string} value - The value to store.
   * @returns {Promise<void>} - A promise that resolves when the value has been saved.
   * @example
   * await storage.save('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
   */
  async save(key: string, value: string): Promise<void> {
    sessionStorage.setItem(this.PREFIX + key, value);
  }

  /**
   * Removes a value from sessionStorage with secure prefix.
   * @param {string} key - The key of the item to remove.
   * @returns {Promise<void>} - A promise that resolves when the value has been removed.
   * @example
   * await storage.remove('authToken');
   */
  async remove(key: string): Promise<void> {
    sessionStorage.removeItem(this.PREFIX + key);
  }
}
