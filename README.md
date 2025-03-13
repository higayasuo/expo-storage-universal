# expo-storage-universal

A universal storage implementation for Expo that works across all platforms, including web. This package extends @react-native-async-storage/async-storage and expo-secure-store functionality by providing a consistent interface that works on web platforms and automatically switches implementations based on the platform.

## Features

- 🌐 Universal storage API that works across all platforms (iOS, Android, Web)
- 🔒 Secure storage support on native platforms (iOS, Android)
- 🔄 Automatic platform detection and implementation switching
- 📱 Uses native storage solutions on mobile platforms
- 🌍 Uses sessionStorage on web platform

## Installation

```bash
npm install expo-storage-universal
```

### Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "@react-native-async-storage/async-storage": "^1.23.1",
  "expo-secure-store": "~14.0.1"
}
```

## Usage

```typescript
import { platformStorage } from 'expo-storage-universal';

// Regular storage operations
await platformStorage.saveToStorage('key', 'value');
const value = await platformStorage.getFromStorage('key');
await platformStorage.removeFromStorage('key');

// Secure storage operations (recommended only for native platforms)
await platformStorage.saveToSecureStorage('secureKey', 'secretValue');
const secretValue = await platformStorage.getFromSecureStorage('secureKey');
await platformStorage.removeFromSecureStorage('secureKey');
```

## API

### Storage Interface

```typescript
interface Storage {
  // Regular storage operations
  getFromStorage(key: string): Promise<string | undefined>;
  saveToStorage(key: string, value: string): Promise<void>;
  removeFromStorage(key: string): Promise<void>;

  // Secure storage operations
  getFromSecureStorage(key: string): Promise<string | undefined>;
  saveToSecureStorage(key: string, value: string): Promise<void>;
  removeFromSecureStorage(key: string): Promise<void>;
}
```

### Platform-specific Implementations

#### Native Platforms (iOS/Android)
- Regular storage: Uses `@react-native-async-storage/async-storage`
- Secure storage: Uses `expo-secure-store` for encrypted storage

#### Web Platform
- Regular storage: Uses `sessionStorage` with `regular_` prefix
- Secure storage: Uses `sessionStorage` with `secure_` prefix (Note: sessionStorage is not truly secure on web platforms)

## Security Considerations

Please note that on web platforms, the "secure" storage operations use sessionStorage, which is not truly secure. Sensitive data should only be stored using secure storage on native platforms where proper encryption is available through `expo-secure-store`.

## License

MIT
