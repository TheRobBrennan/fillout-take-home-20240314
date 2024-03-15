// tests/index.test.ts
import { describe, it, expect, vi } from 'vitest';
import app from '../src/app';

vi.mock('../src/app', () => ({
  default: {
    listen: vi.fn(),
  },
  // other exports can be mocked here
}));

describe('Server initialization', () => {
  it('should start server on the correct port', async () => {
    // Dynamically import your module if necessary
    await import('../src/index.ts');

    expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });
});
