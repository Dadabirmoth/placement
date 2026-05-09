const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  createProfile,
  getMyProfile,
  updateProfile,
  getPublicProfile,
} = require('../controllers/profileController');

// Validation pour la création (tous les champs obligatoires)
const profileValidation = [
  body('dateNaissance').notEmpty().withMessage('Date de naissance requise'),
  body('lieuNaissance').notEmpty().withMessage('Lieu de naissance requis'),
  body('telephone').notEmpty().withMessage('Numéro de téléphone requis'),
  body('adresse').notEmpty().withMessage('Adresse requise'),
  body('numeroCNI').notEmpty().withMessage('Numéro CNI requis'),
];

// Validation pour la mise à jour (tous les champs optionnels)
const profileUpdateValidation = [
  body('dateNaissance').optional().notEmpty().withMessage('Date de naissance requise'),
  body('lieuNaissance').optional().notEmpty().withMessage('Lieu de naissance requis'),
  body('telephone').optional().notEmpty().withMessage('Numéro de téléphone requis'),
  body('adresse').optional().notEmpty().withMessage('Adresse requise'),
  body('numeroCNI').optional().notEmpty().withMessage('Numéro CNI requis'),
];

// Routes
router.post('/', protect, profileValidation, createProfile);
router.get('/me', protect, getMyProfile);
router.put('/me', protect, profileUpdateValidation, updateProfile); // ← utilise la validation souple
router.get('/:id', getPublicProfile);

module.exports = router;