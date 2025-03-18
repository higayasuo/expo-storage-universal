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

## Usage

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
  find(): Promise<T | undefined>;
  retrieve(): Promise<T>;
  save(value: T): Promise<void>;
  remove(): Promise<void>;
}
```

### Available Storage Wrappers
- `StringValueStorageWrapper`: For storing string values
- `Uint8ArrayValueStorageWrapper`: For storing binary data (automatically handles base64 encoding/decoding)

## License

MIT
