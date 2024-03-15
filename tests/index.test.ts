// tests/index.test.ts
import { describe, it, expect, vi } from 'vitest';
import app from '../src/app';

vi.mock('../src/app', () => ({
  default: {
    listen: vi.fn().mockImplementation((port, callback) => callback()),
  },
  // other exports can be mocked here
}));

describe('Server initialization', () => {
  it('should start server on the correct port and log the message', async () => {
    // Mock console.log
    const consoleSpy = vi.spyOn(console, 'log');

    // Dynamically import your module to ensure the mocks are in place first
    await import('../src/index.ts');

    // Verify that app.listen was called correctly
    expect(app.listen).toHaveBeenCalledWith("3000", expect.any(Function));

    // Verify that console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith(`Server running on http://localhost:3000`);

    // Restore the original console.log behavior after the test
    consoleSpy.mockRestore();
  });
});
