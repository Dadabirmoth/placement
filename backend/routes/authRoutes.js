const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const registerValidation = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('telephone').notEmpty().withMessage('Le téléphone est requis'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('email').optional().isEmail().withMessage('Email invalide'),
  body('role')
    .optional()
    .isIn(['domestic', 'employer', 'admin'])
    .withMessage('Rôle invalide'),
];

const loginValidation = [
  body('telephone').notEmpty().withMessage('Le téléphone est requis'),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router;