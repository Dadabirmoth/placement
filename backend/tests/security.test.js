require('dotenv').config();

const request = require('supertest');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Application de test isolée pour les middlewares
const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2, // petit max pour tester
    message: 'Too many requests',
  })
);
app.get('/test', (req, res) => res.send('ok'));

describe('Sécurité globale', () => {
  it('devrait inclure les en-têtes Helmet', async () => {
    const res = await request(app).get('/test');
    expect(res.headers['x-content-type-options']).toEqual('nosniff');
    expect(res.headers['x-frame-options']).toBeDefined();
  });

  it('devrait bloquer après trop de requêtes', async () => {
    // Appeler 3 fois (max = 2)
    await request(app).get('/test');
    await request(app).get('/test');
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(429);
  });
});