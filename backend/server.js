require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware de base
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Pour tester
app.get('/', (req, res) => {
  res.send('Backend opérationnel');
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à PostgreSQL réussie.');
    // Synchroniser les modèles (crée les tables si elles n'existent pas)
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