# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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