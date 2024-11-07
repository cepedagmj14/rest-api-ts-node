import request from 'supertest';
import server, { connectDB } from '../../src/server';
import db from '../../src/config/db';

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({});
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);
  });

  it('should validate that the price is a number and greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'monitor curso precio cero o string',
      price: 'hola',
    });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
  });

  it('should validation price', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'monitor curvo teste',
      price: 0,
    });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  });

  it('should send a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'probando con supertest',
      price: 4522,
    });

    expect(response.status).toBe(201);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products', () => {
  it('should check if api/products url exist', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).not.toBe(400 | 404);
  });

  it('GET a JSON response with products', async () => {
    const response = await request(server).get('/api/products');

    expect(response.status).toBe(200);

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');

    expect(response.body).not.toHaveProperty('errors');
    expect(response.status).not.toBe(201);
    expect(response.status).not.toBe(400);
  });
});

describe('GET /api/products/:id', () => {
  it('should return a 404 response for a not-exist product', async () => {
    const productoID = 2000;
    const response = await request(server).get(`/api/products/${productoID}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('producto no encontrado');
  });

  test('should a valid id the url', async () => {
    const idNoValid = 'string';
    const response = await request(server).get(`/api/products/${idNoValid}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('ID no valido');
  });

  test('get a JSON response for a single product', async () => {
    const productoID = 1;
    const response = await request(server).get(`/api/products/${productoID}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /api/products/:id', () => {
  it('should a valid id the url', async () => {
    const response = await request(server).put(`/api/products/no-valid`).send({
      name: 'monitor curvo',
      availability: true,
      price: 500,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('ID no valido');
  });

  it('should display validation error message when updating a product', async () => {
    const response = await request(server).put('/api/products/1').send({});
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(5);
    expect(response.body).toHaveProperty('errors');
    expect(response.status).not.toBe(200);
    expect(response.body).not.toBe('data');
  });

  it('should validate that the price is greather tahn 0', async () => {
    const response = await request(server).put('/api/products/1').send({
      name: 'monitor curvo',
      availability: true,
      price: -500,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toEqual('Precio no valido');
    expect(response.status).not.toBe(200);
    expect(response.body).not.toBe('data');
  });
});

describe('DELETE /api/products/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/products/not-valid');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('ID no valido');
  });

  it('should return a 404 response for a non-existent product', async () => {
    const response = await request(server).delete('/api/products/775');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('producto no encontrado');
    expect(response.status).not.toBe(200);
  });

  it('should delete a product', async () => {
    const response = await request(server).delete('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe('producto eliminado');
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});

describe('PATCH /api/products/:id', () => {
  it('should return a 404 response for a non-existing product', async () => {
    const response = await request(server).patch('/api/products/4000');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('producto no encontrado');
  });
  it('should update product using patch', async () => {
    const response = await request(server).patch('/api/products/2');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});
