# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.7] - 2025-05-13

### Changed

- Bump version to 0.3.7 to match expo-storage-universal-web version

## [0.3.6] - 2024-05-13

### Changed

- Refactored `JsonValuesStorageWrapper` to use a single comparison function provided in the constructor
  - Removed comparison function parameter from individual method calls
  - Added comparison function parameter to constructor
  - Made comparison function optional in `sortItems` method
  - Updated documentation and examples to reflect the new API

## [0.3.5] - 2024-05-13

### Added

- `JsonValuesStorageWrapper<T>` for storing and manipulating arrays of JSON data with type safety
  - `addItem`: Add a single item to the array
  - `updateItem`: Update a single item in the array
  - `updateItems`: Update multiple items in the array
  - `removeItem`: Remove a single item from the array
  - `removeItems`: Remove multiple items from the array
  - `getItemsByFilter`: Filter items in the array
  - `sortItems`: Sort items in the array (returns new array, doesn't modify storage)
- Comprehensive test suite for JsonValuesStorageWrapper
- Updated README with JsonValuesStorageWrapper documentation and examples

## [0.3.4] - 2024-05-05

### Changed

- Bump version to 0.3.4

## [0.3.3] - 2024-04-30

### Added

- `NumberValueStorageWrapper` for storing number values
- `BooleanValueStorageWrapper` for storing boolean values (using '1'/'0' for efficient storage)
- `DateValueStorageWrapper` for storing Date values (using timestamp for efficient storage)
- `JsonValueStorageWrapper<T>` for storing JSON data with type safety
- Storage format details section in README
- Examples for all available StorageWrappers in README

### Changed

- Updated README with comprehensive documentation of all StorageWrappers
- Improved code formatting in README examples

## [0.3.2] - 2024-03-14

### Changed

- Bump version to 0.3.2

## [0.3.1] - 2024-03-14

### Changed

- Changed `retrieve()` method to throw error when value is not found (previously returned undefined)

## [0.3.0] - 2024-03-14

### Changed

- Removed platform-specific implementations and secure storage features
- Simplified package description to focus on core functionality
- Updated documentation to accurately reflect current features

### Added

- Type-safe StorageWrapper interface for working with typed data
- StringValueStorageWrapper implementation for string values
- Uint8ArrayValueStorageWrapper implementation for binary data with automatic base64 encoding/decoding
- Comprehensive JSDoc documentation for all classes and interfaces
- Vitest test suite for all implementations

### Changed

- Simplified Storage interface to focus on core operations
- Updated method names for consistency across all implementations
- Improved error handling in StorageWrapper implementations
- Enhanced documentation with examples

### Fixed

- Method name inconsistencies across implementations
- Type safety issues in storage operations
- Documentation to reflect current API

## [0.2.0] - 2024-03-14

### Added

- Type-safe StorageWrapper interface for working with typed data
- StringValueStorageWrapper implementation for string values
- Uint8ArrayValueStorageWrapper implementation for binary data with automatic base64 encoding/decoding
- Comprehensive JSDoc documentation for all classes and interfaces
- Vitest test suite for all implementations

### Changed

- Simplified Storage interface to focus on core operations
- Updated method names for consistency across all implementations
- Improved error handling in StorageWrapper implementations
- Enhanced documentation with examples

### Fixed

- Method name inconsistencies across implementations
- Type safety issues in storage operations
- Documentation to reflect current API

## [0.1.0] - 2024-03-13

### Added

- Initial release
- Universal storage interface for Expo applications
- TypeScript support with full type definitions
- Comprehensive documentation and usage examples
