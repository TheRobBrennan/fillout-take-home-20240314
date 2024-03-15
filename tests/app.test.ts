import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return 200 OK with message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Express with TypeScript!');
  });
});

describe('GET /:formId/filteredResponses', () => {
  it('should return JSON data for a valid formId', async () => {
    const formId = 'cLZojxk94ous';
    const response = await request(app).get(`/${formId}/filteredResponses`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    // Add more expectations here to validate the structure of the response
    expect(response.body.formId).toBe(formId);
  });

  // Additional tests can include invalid formId cases, error handling, etc.
});
