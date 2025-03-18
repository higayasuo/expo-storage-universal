import { WebRegularStorage } from './WebRegularStorage';
import { WebSecureStorage } from './WebSecureStorage';
import { NativeRegularStorage } from './NativeRegularStorage';
import { NativeSecureStorage } from './NativeSecureStorage';

const isWeb = typeof window !== 'undefined' && window.postMessage !== undefined;

export const regularStorage = isWeb
  ? new WebRegularStorage()
  : new NativeRegularStorage();

export const secureStorage = isWeb
  ? new WebSecureStorage()
  : new NativeSecureStorage();
