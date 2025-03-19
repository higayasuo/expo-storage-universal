# expo-storage-universal

A universal storage implementation for Expo that works across all platforms. This package provides a consistent interface for storage operations with type-safe wrappers for different data types.

## Features

- 🌐 Universal storage API that works across all platforms
- 📦 Type-safe storage wrappers for different data types
- 🔐 Base64 encoding support for binary data
- 📱 Consistent interface across platforms

## Installation

```bash
npm install expo-storage-universal
```

For platform-specific implementations, install the corresponding package:

```bash
# For native platforms (iOS/Android)
npm install expo-storage-universal-native

# For web platform
npm install expo-storage-universal-web
```

## Usage

### Getting Storage Instances

#### Platform-Specific Imports
```typescript
import { Platform } from 'react-native';
import { WebRegularStorage, WebSecureStorage } from 'expo-storage-universal-web';
import {
  NativeRegularStorage,
  NativeSecureStorage,
} from 'expo-storage-universal-native';

// Conditionally create storage instances based on platform
const regularStorage = Platform.OS === 'web' ? new WebRegularStorage() : new NativeRegularStorage();
const secureStorage = Platform.OS === 'web' ? new WebSecureStorage() : new NativeSecureStorage();
```

#### Web Platform
```typescript
import { WebRegularStorage, WebSecureStorage } from 'expo-storage-universal-web';

// For regular storage (non-secure)
const regularStorage = new WebRegularStorage();

// For secure storage
const secureStorage = new WebSecureStorage();
```

#### Native Platform (iOS/Android)
```typescript
import {
  NativeRegularStorage,
  NativeSecureStorage,
} from 'expo-storage-universal-native';

// For regular storage (non-secure)
const regularStorage = new NativeRegularStorage();

// For secure storage
const secureStorage = new NativeSecureStorage();
```

### Type-Safe Storage Wrappers

```typescript
import { StringValueStorageWrapper, Uint8ArrayValueStorageWrapper } from 'expo-storage-universal';

// String value storage
const tokenStorage = new StringValueStorageWrapper(storage, 'auth-token');
await tokenStorage.save('abc123');
const token = await tokenStorage.retrieve(); // Throws if not found
const maybeToken = await tokenStorage.find(); // Returns undefined if not found

// Binary data storage (automatically handles base64 encoding/decoding)
const binaryStorage = new Uint8ArrayValueStorageWrapper(storage, 'binary-data');
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
  find(): Promise<T | undefined>;  // Returns undefined if not found
  retrieve(): Promise<T>;         // Throws error if not found
  save(value: T): Promise<void>;
  remove(): Promise<void>;
}
```

### Available Storage Wrappers
- `StringValueStorageWrapper`: For storing string values
- `Uint8ArrayValueStorageWrapper`: For storing binary data (automatically handles base64 encoding/decoding)

## Platform-Specific Implementations

### Native Platform (iOS/Android)
The [expo-storage-universal-native](https://github.com/higayasuo/expo-storage-universal-native) package provides:
- `NativeRegularStorage`: Non-secure storage using `@react-native-async-storage/async-storage`
- `NativeSecureStorage`: Secure storage using `expo-secure-store`

### Web Platform
The [expo-storage-universal-web](https://github.com/higayasuo/expo-storage-universal-web) package provides:
- `WebRegularStorage`: Storage using `sessionStorage`
- `WebSecureStorage`: Storage using `sessionStorage` (Note: For truly secure storage, use `NativeSecureStorage` on native platforms)

## License

MIT
