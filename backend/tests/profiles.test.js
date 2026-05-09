require('dotenv').config(); // Optionnel, mais inoffensif

const request = require('supertest');
const express = require('express');
const sequelize = require('../config/database');
const User = require('../models/User');
const Profile = require('../models/Profile');
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

let token;
let userId;

describe('Profils domestiques', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Doe',
        prenom: 'Jane',
        email: 'jane@test.com',
        password: '123456',
        role: 'domestic',
      });
    token = res.body.token;
    userId = res.body._id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('devrait créer un profil pour un domestique', async () => {
    const res = await request(app)
      .post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        dateNaissance: '1990-05-15',
        lieuNaissance: 'Abidjan',
        telephone: '0102030405',
        adresse: 'Cocody, Rue 12',
        numeroCNI: 'CI123456789',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('dateNaissance');
  });

  it('devrait renvoyer son profil (GET /me)', async () => {
    const res = await request(app)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.telephone).toEqual('0102030405');
  });

  it('devrait mettre à jour le profil', async () => {
    const res = await request(app)
      .put('/api/profiles/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ telephone: '0708091011' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.telephone).toEqual('0708091011');
  });

  it('devrait être accessible publiquement par ID', async () => {
    const meRes = await request(app)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${token}`);
    const profileId = meRes.body.id;

    const res = await request(app)
      .get(`/api/profiles/${profileId}`)
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body.User.nom).toEqual('Doe');
  });
});