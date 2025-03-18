import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock storage classes with proper prototype chains
class MockWebRegularStorage {
  find = vi.fn();
  save = vi.fn();
  remove = vi.fn();
}

class MockWebSecureStorage {
  find = vi.fn();
  save = vi.fn();
  remove = vi.fn();
}

class MockNativeRegularStorage {
  find = vi.fn();
  save = vi.fn();
  remove = vi.fn();
}

class MockNativeSecureStorage {
  find = vi.fn();
  save = vi.fn();
  remove = vi.fn();
}

// Mock storage classes
vi.mock('../WebRegularStorage', () => ({
  WebRegularStorage: MockWebRegularStorage,
}));

vi.mock('../WebSecureStorage', () => ({
  WebSecureStorage: MockWebSecureStorage,
}));

vi.mock('../NativeRegularStorage', () => ({
  NativeRegularStorage: MockNativeRegularStorage,
}));

vi.mock('../NativeSecureStorage', () => ({
  NativeSecureStorage: MockNativeSecureStorage,
}));

// Mock React Native and its dependencies
vi.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}));

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

vi.mock('expo-secure-store', () => ({
  getItemAsync: vi.fn(),
  setItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
}));

describe('platformStorageSelector', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Reset window object and modules before each test
    global.window = originalWindow;
    vi.resetModules();
  });

  describe('when running in web environment', () => {
    beforeEach(() => {
      // Mock window object for web environment
      global.window = {
        postMessage: vi.fn(),
      } as unknown as Window & typeof globalThis;
    });

    it('should return WebRegularStorage instance for regularStorage', async () => {
      const { regularStorage } = await import('../platformStorageSelector');
      const { WebRegularStorage } = await import('../WebRegularStorage');
      expect(regularStorage).toBeInstanceOf(WebRegularStorage);
    });

    it('should return WebSecureStorage instance for secureStorage', async () => {
      const { secureStorage } = await import('../platformStorageSelector');
      const { WebSecureStorage } = await import('../WebSecureStorage');
      expect(secureStorage).toBeInstanceOf(WebSecureStorage);
    });
  });

  describe('when running in native environment', () => {
    beforeEach(() => {
      // Remove window object to simulate native environment
      global.window = undefined as unknown as Window & typeof globalThis;
    });

    it('should return NativeRegularStorage instance for regularStorage', async () => {
      const { regularStorage } = await import('../platformStorageSelector');
      const { NativeRegularStorage } = await import('../NativeRegularStorage');
      expect(regularStorage).toBeInstanceOf(NativeRegularStorage);
    });

    it('should return NativeSecureStorage instance for secureStorage', async () => {
      const { secureStorage } = await import('../platformStorageSelector');
      const { NativeSecureStorage } = await import('../NativeSecureStorage');
      expect(secureStorage).toBeInstanceOf(NativeSecureStorage);
    });
  });
});