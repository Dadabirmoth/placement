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
const adminRoutes = require('../routes/adminRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

let adminToken, employerToken, domesticToken, domesticId;

describe('Dashboard admin', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    // Créer un admin
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@test.com',
        password: '123456',
        role: 'admin',
      });
    adminToken = adminRes.body.token;

    // Créer un employeur
    const empRes = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Employeur',
        prenom: 'Paul',
        email: 'paul@test.com',
        password: '123456',
        role: 'employer',
      });
    employerToken = empRes.body.token;

    // Créer un domestique
    const domRes = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Domestic',
        prenom: 'Marie',
        email: 'marie@test.com',
        password: '123456',
        role: 'domestic',
      });
    domesticToken = domRes.body.token;
    domesticId = domRes.body._id;

    // Créer profil pour le domestique (adresse contient Abidjan)
    await request(app)
      .post('/api/profiles')
      .set('Authorization', `Bearer ${domesticToken}`)
      .send({
        dateNaissance: '1995-08-22',
        lieuNaissance: 'Abidjan',
        telephone: '0101010101',
        adresse: 'Cocody, Abidjan',
        numeroCNI: 'CI987654321',
      });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('devrait retourner la liste des utilisateurs', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toBeGreaterThanOrEqual(3);
  });

  it('devrait filtrer par rôle domestic', async () => {
    const res = await request(app)
      .get('/api/admin/users?role=domestic')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.users.every(u => u.role === 'domestic')).toBe(true);
  });

  it('devrait filtrer par ville (adresse contenant Abidjan)', async () => {
    const res = await request(app)
      .get('/api/admin/users?ville=Abidjan')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.users.length).toBeGreaterThanOrEqual(1);
    // Vérifier que le domestique créé est présent
    expect(res.body.users.some(u => u.id === domesticId)).toBe(true);
  });

  it('devrait retourner les statistiques', async () => {
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.totalUsers).toEqual(3);
    expect(res.body.totalDomestics).toEqual(1);
    expect(res.body.totalEmployers).toEqual(1);
    expect(res.body.totalAdmins).toEqual(1);
    expect(res.body.totalProfiles).toEqual(1);
  });

  it('devrait supprimer un utilisateur', async () => {
    const res = await request(app)
      .delete(`/api/admin/users/${domesticId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);

    // Vérifier que l'utilisateur n'existe plus
    const check = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(check.body.users.some(u => u.id === domesticId)).toBe(false);
  });

  it('ne devrait pas autoriser un non-admin à accéder à la liste', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${employerToken}`);
    expect(res.statusCode).toEqual(403);
  });
});