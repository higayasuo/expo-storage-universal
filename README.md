# expo-storage-universal

A universal storage implementation for Expo that works across all platforms, including web. This package extends @react-native-async-storage/async-storage and expo-secure-store functionality by providing a consistent interface that works on web platforms and automatically switches implementations based on the platform.

## Features

- 🌐 Universal storage API that works across all platforms (iOS, Android, Web)
- 🔒 Secure storage support on native platforms (iOS, Android)
- 🔄 Automatic platform detection and implementation switching
- 📱 Uses native storage solutions on mobile platforms
- 🌍 Uses sessionStorage on web platform
- 📦 Type-safe storage wrappers for different data types
- 🔐 Base64 encoding support for binary data

## Installation

```bash
npm install expo-storage-universal
```

To use this library in your project, you need to run the following commands:

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-secure-store
```

## Usage

### Basic Storage Operations

```typescript
import { regularStorage, secureStorage } from 'expo-storage-universal';

// Regular storage operations
await regularStorage.save('key', 'value');
const value = await regularStorage.find('key');
await regularStorage.remove('key');

// Secure storage operations (recommended only for native platforms)
await secureStorage.save('secureKey', 'secretValue');
const secretValue = await secureStorage.find('secureKey');
await secureStorage.remove('secureKey');
```

### Type-Safe Storage Wrappers

```typescript
import { StringValueStorageWrapper, Uint8ArrayValueStorageWrapper } from 'expo-storage-universal';

// String value storage
const tokenStorage = new StringValueStorageWrapper(secureStorage, 'auth-token');
await tokenStorage.save('abc123');
const token = await tokenStorage.retrieve(); // Throws if not found
const maybeToken = await tokenStorage.find(); // Returns undefined if not found

// Binary data storage (automatically handles base64 encoding/decoding)
const binaryStorage = new Uint8ArrayValueStorageWrapper(secureStorage, 'binary-data');
const data = new Uint8Array([1, 2, 3, 4, 5]);
await binaryStorage.save(data);
const retrievedData = await binaryStorage.retrieve();
```

## API

### Core Storage Interface

```typescript
interface Storage {
  find(key: string): Promise<string | undefined>;
  save(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}
```

### StorageWrapper Interface

```typescript
interface StorageWrapper<T> {
  find(): Promise<T | undefined>;
  retrieve(): Promise<T>;
  save(value: T): Promise<void>;
  remove(): Promise<void>;
}
```

### Platform-specific Implementations

#### Native Platforms (iOS/Android)
- Regular storage: Uses `@react-native-async-storage/async-storage`
- Secure storage: Uses `expo-secure-store` for encrypted storage

#### Web Platform
- Regular storage: Uses `sessionStorage` with `regular_` prefix
- Secure storage: Uses `sessionStorage` with `secure_` prefix (Note: sessionStorage is not truly secure on web platforms)

### Available Storage Wrappers
- `StringValueStorageWrapper`: For storing string values
- `Uint8ArrayValueStorageWrapper`: For storing binary data (automatically handles base64 encoding/decoding)

## Security Considerations

Please note that on web platforms, the "secure" storage operations use sessionStorage, which is not truly secure. Sensitive data should only be stored using secure storage on native platforms where proper encryption is available through `expo-secure-store`.

## License

MIT
