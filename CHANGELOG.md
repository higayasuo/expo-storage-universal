# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-03-14

### Added
- Type-safe StorageWrapper interface for working with typed data
- StringValueStorageWrapper implementation for string values
- Uint8ArrayValueStorageWrapper implementation for binary data with automatic base64 encoding/decoding
- Comprehensive JSDoc documentation for all classes and interfaces
- Vitest test suite for all implementations

### Changed
- Simplified Storage interface to focus on core operations
- Renamed platformStorage to regularStorage and secureStorage for clarity
- Updated method names for consistency across all implementations
- Improved error handling in StorageWrapper implementations
- Enhanced documentation with examples and security considerations

### Fixed
- Method name inconsistencies across implementations
- Type safety issues in storage operations
- Documentation to reflect current API

## [0.1.2] - 2024-03-13

### Changed
- Renamed get methods to find methods for consistency: `getFromStorage` → `findFromStorage` and `getFromSecureStorage` → `findFromSecureStorage`
- Fixed method name typo in NativeStorage implementation
- Updated tests to use correct method names
- Updated documentation to reflect naming changes

## [0.1.1] - 2024-03-13

### Changed
- Removed React Native dependency
- Updated platform detection to use `window.postMessage` instead of React Native's Platform API
- Improved web detection with proper type checking

## [0.1.0] - 2024-03-13

### Added
- Initial release
- Universal storage interface for Expo applications
- Platform-specific implementations for web and native platforms
- WebStorage implementation using sessionStorage for both regular and secure operations (with security limitations on web)
- NativeStorage implementation using AsyncStorage for regular storage and SecureStore for encrypted secure storage
- Automatic platform detection and implementation switching
- Full test coverage for WebStorage implementation
- TypeScript support with full type definitions
- Comprehensive documentation and usage examples with security considerations