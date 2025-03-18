import base64 from 'base64-js';

import { StorageWrapper } from './StorageWrapper';
import { Storage } from './Storage';

export class Uint8ArrayValueStorageWrapper implements StorageWrapper<Uint8Array> {
  private storage: Storage;
  private key: string;

  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  async find(): Promise<Uint8Array | undefined> {
    const storedValue = await this.storage.find(this.key);

    if (!storedValue) {
      return undefined;
    }

    return base64.toByteArray(storedValue);
  }

  async retrieve(): Promise<Uint8Array | undefined> {
    const value = await this.find();

    if (!value) {
      throw new Error(`No value found for key ${this.key}`);
    }

    return value;
  }

  async save(value: Uint8Array): Promise<void> {
    return this.storage.save(this.key, base64.fromByteArray(value));
  }

  async remove(): Promise<void> {
    return this.storage.remove(this.key);
  }
}
