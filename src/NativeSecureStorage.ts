import * as SecureStore from 'expo-secure-store';

import { Storage } from './Storage';

/**
 * NativeSecureStorage implements the Storage interface using Expo's SecureStore.
 * This implementation provides secure storage capabilities for React Native applications,
 * storing data in the device's secure storage system (Keychain on iOS, EncryptedSharedPreferences on Android).
 *
 * @remarks
 * - Uses expo-secure-store for platform-specific secure storage implementation
 * - Provides encryption at rest for stored data
 * - Suitable for storing sensitive information like authentication tokens, API keys, and user credentials
 * - Data persists across app restarts
 */
export class NativeSecureStorage implements Storage {
  /**
   * Creates a new instance of NativeSecureStorage.
   * No initialization is required as SecureStore is stateless.
   */
  constructor() {}

  /**
   * Finds a value from secure storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<string | undefined>} - A promise that resolves to the retrieved value or undefined if not found.
   * @throws {Error} If there's an error accessing the secure storage.
   *
   * @remarks
   * - Returns undefined if the key doesn't exist
   * - Automatically decrypts the stored value
   */
  async find(key: string): Promise<string | undefined> {
    return (await SecureStore.getItemAsync(key)) ?? undefined;
  }

  /**
   * Saves a value to secure storage.
   * @param {string} key - The key under which the value should be stored.
   * @param {string} value - The value to store.
   * @returns {Promise<void>} - A promise that resolves when the value has been saved.
   * @throws {Error} If there's an error saving to secure storage.
   *
   * @remarks
   * - Automatically encrypts the value before storage
   * - If the key already exists, the value will be overwritten
   */
  async save(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  /**
   * Removes a value from secure storage.
   * @param {string} key - The key of the item to remove.
   * @returns {Promise<void>} - A promise that resolves when the value has been removed.
   * @throws {Error} If there's an error removing from secure storage.
   *
   * @remarks
   * - No-op if the key doesn't exist
   * - Permanently deletes the encrypted data
   */
  async remove(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
