import request from 'supertest';
import server from '../src/server';
import { connectDB } from '../src/server';
import db from '../src/config/db';

describe('GET /api', () => {
  it('should send back a json response', async () => {
    const response = await request(server).get('/api');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Desde API');
    expect(response.status).not.toBe(404);
    expect(response.body.msg).not.toBe('desde api');
  });
});

jest.mock('../src/config/db', () => {
  return {
    authenticate: jest.fn(),
    sync: jest.fn(),
  };
});

describe('ConnectDB', () => {
  it('should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValue(new Error('hubo un error al conectarse a la BBDD'));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('hubo un error al conectarse a la BBDD')
    );
  });
});
