import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(response.status).toBe(200);
  });

  it('returns 400 if parameters are missing', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(400);
  });

  it('returns 404 if image does not exist', async () => {
    const response = await request.get('/api/images?filename=unknown&width=200&height=200');
    expect(response.status).toBe(404);
  });

  it('returns 400 if width is not a number (e.g. 500f)', async () => {
  const response = await request.get('/api/images?filename=fjord&width=500f&height=200');
  expect(response.status).toBe(400);
});
it('returns 400 if width is 0 or negative', async () => {
  const response = await request.get('/api/images?filename=fjord&width=-200&height=200');
  expect(response.status).toBe(400);
});
});