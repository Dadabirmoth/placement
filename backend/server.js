require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

// Importer les routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); // ⬅️ AJOUT OBLIGATOIRE

// Importer les modèles pour que Sequelize les enregistre
const User = require('./models/User');
const Profile = require('./models/Profile');

const app = express();

// Middleware de base
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

// Test
app.get('/', (req, res) => {
  res.send('Backend opérationnel');
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à PostgreSQL réussie.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur backend démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion ou de synchronisation :', err);
  });