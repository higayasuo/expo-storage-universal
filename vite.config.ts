import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ExpoStorageUniversal',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        '@react-native-async-storage/async-storage',
        'expo-secure-store',
        'react-native',
      ],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});