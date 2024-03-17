import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    silent: true // NOTE: Set silent to false to see console output during test execution
  }
});
