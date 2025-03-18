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