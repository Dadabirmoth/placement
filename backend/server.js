require('dotenv').config();
const path = require('path'); // ⬅️ AJOUT
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const sequelize = require('./config/database');

// Modèles (pour la synchronisation)
const User = require('./models/User');
const Profile = require('./models/Profile');
const Review = require('./models/Review');

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ----- SECURITY MIDDLEWARES -----

// 1. Helmet : sécurise les headers HTTP
app.use(helmet());

// 2. CORS : autorise uniquement le frontend (à adapter en prod)
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// 3. Rate limiting global (100 requêtes / 15 min par IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Trop de requêtes, veuillez réessayer plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// 4. Rate limiting plus strict pour les routes sensibles
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Trop de tentatives d’authentification.' },
});
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { message: 'Trop de requêtes admin.' },
});

// 5. Journalisation HTTP avec Morgan (mode dev)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ----- FIN MIDDLEWARES -----

// Middleware de base
app.use(express.json({ limit: '10mb' })); // limite la taille du body

// Desserte des fichiers uploadés (photos de profil)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ⬅️ AJOUT

// Appliquer les limiters spécifiques
app.use('/api/auth', authLimiter);
app.use('/api/admin', adminLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

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