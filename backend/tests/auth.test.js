require('dotenv').config();
const request = require('supertest');
const express = require('express');
const sequelize = require('../config/database');
const User = require('../models/User');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('POST /api/auth/register', () => {
  beforeAll(async () => {
    // Connexion à la base de test (utilise la même base pour l'instant)
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // recrée les tables
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('devrait créer un utilisateur et renvoyer un token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Doe',
        prenom: 'John',
        email: 'john@test.com',
        password: '123456',
        role: 'domestic',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toEqual('john@test.com');
  });

  it('devrait échouer si email déjà utilisé', async () => {
    // On ré-enregistre le même email
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Jane',
        prenom: 'Doe',
        email: 'john@test.com', // même email que précédent
        password: '123456',
        role: 'domestic',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/déjà utilisé/);
  });
});