import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    // Set silent to true to disable Vite's default console output
    silent: true // NOTE: Set to false to see console output during test execution
  }
});
