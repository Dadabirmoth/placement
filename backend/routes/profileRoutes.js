const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  createProfile,
  getMyProfile,
  updateProfile,
  getAllProfiles,
  getPublicProfile,
} = require('../controllers/profileController');

// Validation pour la création
const profileValidation = [
  body('dateNaissance').notEmpty().withMessage('Date de naissance requise'),
  body('lieuNaissance').notEmpty().withMessage('Lieu de naissance requis'),
  body('telephone').notEmpty().withMessage('Numéro de téléphone requis'),
  body('adresse').notEmpty().withMessage('Adresse requise'),
  body('numeroCNI').notEmpty().withMessage('Numéro CNI requis'),
];

// Validation pour la mise à jour
const profileUpdateValidation = [
  body('dateNaissance').optional().notEmpty().withMessage('Date de naissance requise'),
  body('lieuNaissance').optional().notEmpty().withMessage('Lieu de naissance requis'),
  body('telephone').optional().notEmpty().withMessage('Numéro de téléphone requis'),
  body('adresse').optional().notEmpty().withMessage('Adresse requise'),
  body('numeroCNI').optional().notEmpty().withMessage('Numéro CNI requis'),
];

// Routes
// IMPORTANT : la route GET '/' doit être AVANT la route '/:id' pour éviter les conflits
router.get('/', getAllProfiles);
router.post('/', protect, upload.single('photo'), profileValidation, createProfile);
router.get('/me', protect, getMyProfile);
router.put('/me', protect, upload.single('photo'), profileUpdateValidation, updateProfile);
router.get('/:id', getPublicProfile);

module.exports = router;