/**
 * Interface for handling both regular and secure storage operations
 */
export interface Storage {
  /**
   * Finds a value from regular storage by key
   * @param key - The key to look up
   * @returns Promise resolving to the stored value, or undefined if not found
   */
  findFromStorage: (key: string) => Promise<string | undefined>;

  /**
   * Saves a value to regular storage
   * @param key - The key to store under
   * @param value - The string value to store
   * @returns Promise that resolves when save is complete
   */
  saveToStorage: (key: string, value: string) => Promise<void>;

  /**
   * Removes a value from regular storage
   * @param key - The key to remove
   * @returns Promise that resolves when removal is complete
   */
  removeFromStorage: (key: string) => Promise<void>;

  /**
   * Finds a value from secure storage by key
   * @param key - The key to look up
   * @returns Promise resolving to the stored value, or undefined if not found
   */
  findFromSecureStorage: (key: string) => Promise<string | undefined>;

  /**
   * Saves a value to secure storage
   * @param key - The key to store under
   * @param value - The string value to store
   * @returns Promise that resolves when save is complete
   */
  saveToSecureStorage: (key: string, value: string) => Promise<void>;

  /**
   * Removes a value from secure storage
   * @param key - The key to remove
   * @returns Promise that resolves when removal is complete
   */
  removeFromSecureStorage: (key: string) => Promise<void>;
}
