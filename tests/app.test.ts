import { describe, it, expect, afterEach, beforeAll, vitest, beforeAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import * as lib from '../src/lib/filterFormResponses';

describe('GET /', () => {
  it('should redirect to the FILLOUT_FORM_ID endpoint', async () => {
    const formId = process.env.FILLOUT_FORM_ID
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(`/${formId}/filteredResponses`);
  });
});

// Test for fetching and saving form responses
describe('GET /:formId/filteredResponses', () => {
  // If you are mocking for a specific test, ensure mocks are set up and torn down correctly.
  beforeEach(() => {
    // Restore the original function before each test to prevent unintended behavior.
    vitest.restoreAllMocks();
  });

  it('should return JSON data for a valid formId', async () => {
    // Ensure this test uses the real implementation or a successful mock response as needed.
    const formId = process.env.FILLOUT_FORM_ID;
    const response = await request(app).get(`/${formId}/filteredResponses`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    // Ensure you're asserting against a known good response here.
  });

  it('should respond with 500 if fetching form responses fails', async () => {
    vitest.spyOn(lib, 'fetchAndSaveFormResponses').mockImplementation(async () => {
      throw new Error('Mocked error');
    });

    const formId = 'nonexistentFormId';
    const response = await request(app).get(`/${formId}/filteredResponses`);

    expect(response.status).toBe(500);
    expect(response.text).toBe('An error occurred while fetching form responses.');
  });
});
