/**
 * StorageWrapper provides a type-safe wrapper around storage operations for a specific key.
 * This interface abstracts the storage operations and provides a more convenient API
 * for working with typed data in storage.
 *
 * @template T - The type of data being stored and retrieved
 *
 * @example
 * ```typescript
 * const userStorage = new StorageWrapper<User>(storage, 'user-key');
 * await userStorage.save({ id: 1, name: 'John' });
 * const user = await userStorage.find();
 * ```
 */
export interface StorageWrapper<T> {
  /**
   * Finds a value from storage.
   * @returns {Promise<T | undefined>} A promise that resolves to the stored value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  find(): Promise<T | undefined>;

  /**
   * Alias for find(). Retrieves a value from storage.
   * @returns {Promise<T | undefined>} A promise that resolves to the stored value or undefined if not found
   * @throws {Error} If there's an error accessing the storage
   */
  retrieve(): Promise<T | undefined>;

  /**
   * Saves a value to storage.
   * @param {T} value - The value to store
   * @returns {Promise<void>} A promise that resolves when the value has been saved
   * @throws {Error} If there's an error saving to storage
   */
  save(value: T): Promise<void>;

  /**
   * Removes a value from storage.
   * @returns {Promise<void>} A promise that resolves when the value has been removed
   * @throws {Error} If there's an error removing from storage
   */
  remove(): Promise<void>;
}
