require('dotenv').config();

const request = require('supertest');
const express = require('express');
const sequelize = require('../config/database');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Review = require('../models/Review');
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const reviewRoutes = require('../routes/reviewRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reviews', reviewRoutes);

let employerToken, domesticToken, domesticId;

describe('Avis (reviews)', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Créer un employeur
    const employerRes = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Employeur',
        prenom: 'Paul',
        email: 'paul@test.com',
        password: '123456',
        role: 'employer',
      });
    employerToken = employerRes.body.token;

    // Créer un domestique
    const domesticRes = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Domestic',
        prenom: 'Marie',
        email: 'marie@test.com',
        password: '123456',
        role: 'domestic',
      });
    domesticToken = domesticRes.body.token;
    domesticId = domesticRes.body._id;

    // Créer un profil pour le domestique
    await request(app)
      .post('/api/profiles')
      .set('Authorization', `Bearer ${domesticToken}`)
      .send({
        dateNaissance: '1995-08-22',
        lieuNaissance: 'Yopougon',
        telephone: '0101010101',
        adresse: 'Rue 10',
        numeroCNI: 'CI987654321',
      });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('devrait permettre à un employeur de laisser un avis', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({
        domesticId: domesticId,
        rating: 4,
        comment: 'Travail impeccable !',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.rating).toEqual(4);
  });

  it('devrait refuser un avis sans authentification', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .send({ domesticId: domesticId, rating: 3 });
    expect(res.statusCode).toEqual(401);
  });

  it('devrait lister les avis d’un domestique avec moyenne', async () => {
    // Ajouter un second avis
    await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({ domesticId: domesticId, rating: 5, comment: 'Super' });

    const res = await request(app).get(`/api/reviews/domestic/${domesticId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toEqual(2);
    expect(res.body.average).toEqual(4.5);
    expect(res.body.reviews.length).toEqual(2);
  });

  it('le profil public doit contenir le nombre d’avis et la note moyenne', async () => {
    // Récupérer le profil via l'ID du profil (on a besoin de l'ID)
    const profileRes = await request(app)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${domesticToken}`);
    const profileId = profileRes.body.id;

    const res = await request(app).get(`/api/profiles/${profileId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.totalReviews).toEqual(2);
    expect(res.body.averageRating).toEqual(4.5);
  });
});