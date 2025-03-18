import { WebStorage } from './WebStorage';
import { NativeStorage } from './NativeStorage';

const isWeb = typeof window !== 'undefined' && window.postMessage !== undefined;

export const platformStorage = isWeb ? new WebStorage() : new NativeStorage();
