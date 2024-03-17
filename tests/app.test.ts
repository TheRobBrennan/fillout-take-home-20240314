import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

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
  it('should return JSON data for a valid formId', async () => {
    const formId = process.env.FILLOUT_FORM_ID
    const response = await request(app).get(`/${formId}/filteredResponses`);

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});
