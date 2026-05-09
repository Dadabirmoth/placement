const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  try {
    // Le middleware 'protect' doit être appelé avant, donc req.user existe
    if (!req.user) {
      return res.status(401).json({ message: 'Authentification requise.' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé aux administrateurs.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { adminAuth };