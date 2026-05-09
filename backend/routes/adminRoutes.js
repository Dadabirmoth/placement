const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');
const { getUsers, deleteUser, getStats } = require('../controllers/adminController');

// Validation pour les filtres (optionnels)
const filterValidation = [
  query('role').optional().isIn(['domestic', 'employer', 'admin']).withMessage('Rôle invalide'),
  query('ville').optional().isString(),
  query('dateDebut').optional().isISO8601().withMessage('Date de début invalide'),
  query('dateFin').optional().isISO8601().withMessage('Date de fin invalide'),
];

// Toutes les routes admin nécessitent d'abord 'protect', puis 'adminAuth'
router.get('/users', protect, adminAuth, filterValidation, getUsers);
router.delete('/users/:id', protect, adminAuth, deleteUser);
router.get('/stats', protect, adminAuth, getStats);

module.exports = router;