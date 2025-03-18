/**
 * Universal Storage interface that works across all platforms (web and native).
 */
export interface Storage {
  /**
   * Retrieves a value from storage.
   *
   * @param key - The key of the item to retrieve.
   * @returns A promise that resolves to the retrieved value or undefined if not found.
   */
  find: (key: string) => Promise<string | undefined>;

  /**
   * Saves a value to storage.
   *
   * @param key - The key under which the value should be stored.
   * @param value - The value to store.
   * @returns A promise that resolves when the value has been saved.
   */
  save: (key: string, value: string) => Promise<void>;

  /**
   * Removes a value from storage.
   *
   * @param key - The key of the item to remove.
   * @returns A promise that resolves when the value has been removed.
   */
  remove: (key: string) => Promise<void>;
}
