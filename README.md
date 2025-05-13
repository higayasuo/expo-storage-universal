# expo-storage-universal

A universal storage implementation for Expo that works across all platforms. This package provides a consistent interface for storage operations with type-safe wrappers for different data types.

## Features

- 🌐 Universal storage API that works across all platforms
- 📦 Type-safe storage wrappers for different data types
- 🔐 Base64 encoding support for binary data
- 📱 Consistent interface across platforms
- ⚡ Efficient storage format for each data type
- 🔄 Array manipulation utilities for JSON collections

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
import {
  WebRegularStorage,
  WebSecureStorage,
} from 'expo-storage-universal-web';
import {
  NativeRegularStorage,
  NativeSecureStorage,
} from 'expo-storage-universal-native';

// Conditionally create storage instances based on platform
const regularStorage =
  Platform.OS === 'web' ? new WebRegularStorage() : new NativeRegularStorage();
const secureStorage =
  Platform.OS === 'web' ? new WebSecureStorage() : new NativeSecureStorage();
```

#### Web Platform

```typescript
import {
  WebRegularStorage,
  WebSecureStorage,
} from 'expo-storage-universal-web';

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
import {
  StringValueStorageWrapper,
  NumberValueStorageWrapper,
  BooleanValueStorageWrapper,
  DateValueStorageWrapper,
  JsonValueStorageWrapper,
  JsonValuesStorageWrapper,
  Uint8ArrayValueStorageWrapper,
} from 'expo-storage-universal';

// String value storage
const tokenStorage = new StringValueStorageWrapper(storage, 'auth-token');
await tokenStorage.save('abc123');
const token = await tokenStorage.retrieve(); // Throws if not found
const maybeToken = await tokenStorage.find(); // Returns undefined if not found

// Number value storage
const countStorage = new NumberValueStorageWrapper(storage, 'counter');
await countStorage.save(42);
const count = await countStorage.retrieve();

// Boolean value storage (uses '1'/'0' for efficient storage)
const flagStorage = new BooleanValueStorageWrapper(storage, 'feature-flag');
await flagStorage.save(true);
const isEnabled = await flagStorage.retrieve();

// Date value storage (uses timestamp for efficient storage)
const lastLoginStorage = new DateValueStorageWrapper(storage, 'last-login');
await lastLoginStorage.save(new Date());
const lastLogin = await lastLoginStorage.retrieve();

// JSON value storage
const userStorage = new JsonValueStorageWrapper<User>(storage, 'user-data');
await userStorage.save({ id: 1, name: 'John' });
const user = await userStorage.retrieve();

// JSON array storage with collection utilities
interface User {
  id: number;
  name: string;
  active: boolean;
}

const compareById = (a: User, b: User) => a.id - b.id;
const usersStorage = new JsonValuesStorageWrapper<User>(
  storage,
  'users',
  compareById,
);

// Add a new user
await usersStorage.addItem({ id: 1, name: 'John', active: true });

// Update a user
await usersStorage.updateItem({ id: 1, name: 'Johnny', active: true });

// Update multiple users
await usersStorage.updateItems([
  { id: 1, name: 'Johnny', active: true },
  { id: 2, name: 'Jane', active: false },
]);

// Remove a user
await usersStorage.removeItem({ id: 1, name: 'Johnny', active: true });

// Remove multiple users
await usersStorage.removeItems([
  { id: 1, name: 'Johnny', active: true },
  { id: 2, name: 'Jane', active: false },
]);

// Filter active users
const activeUsers = await usersStorage.getItemsByFilter((user) => user.active);

// Sort users by name (using default comparison from constructor)
const sortedUsers = await usersStorage.sortItems();

// Sort users by name (using custom comparison)
const sortedByName = await usersStorage.sortItems((a, b) =>
  a.name.localeCompare(b.name),
);

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
  find(): Promise<T | undefined>; // Returns undefined if not found
  retrieve(): Promise<T>; // Throws error if not found
  save(value: T): Promise<void>;
  remove(): Promise<void>;
}
```

### Available Storage Wrappers

- `StringValueStorageWrapper`: For storing string values
- `NumberValueStorageWrapper`: For storing number values
- `BooleanValueStorageWrapper`: For storing boolean values (uses '1'/'0' for efficient storage)
- `DateValueStorageWrapper`: For storing Date values (uses timestamp for efficient storage)
- `JsonValueStorageWrapper<T>`: For storing JSON data with type safety
- `JsonValuesStorageWrapper<T>`: For storing and manipulating arrays of JSON data with type safety
- `Uint8ArrayValueStorageWrapper`: For storing binary data (automatically handles base64 encoding/decoding)

### JsonValuesStorageWrapper Methods

```typescript
class JsonValuesStorageWrapper<T> extends JsonValueStorageWrapper<T[]> {
  constructor(
    storage: Storage,
    key: string,
    compareItem: (a: T, b: T) => number,
  );

  // Add a single item to the array
  addItem(item: T): Promise<void>;

  // Update a single item in the array
  updateItem(item: T): Promise<void>;

  // Update multiple items in the array
  updateItems(items: T[]): Promise<void>;

  // Remove a single item from the array
  removeItem(item: T): Promise<void>;

  // Remove multiple items from the array
  removeItems(items: T[]): Promise<void>;

  // Filter items in the array
  getItemsByFilter(filterItem: (item: T) => boolean): Promise<T[]>;

  // Sort items in the array (returns new array, doesn't modify storage)
  // If no comparison function is provided, uses the one from constructor
  sortItems(compareItem?: (a: T, b: T) => number): Promise<T[]>;
}
```

## Storage Format Details

Each wrapper uses an optimized storage format:

- **String**: Stored as-is
- **Number**: Stored as string representation
- **Boolean**: Stored as '1'/'0' for minimal storage usage
- **Date**: Stored as timestamp (number) for efficient storage and parsing
- **JSON**: Stored as stringified JSON
- **Binary**: Stored as base64-encoded string

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
