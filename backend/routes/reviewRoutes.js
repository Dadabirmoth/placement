const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { createReview, getReviewsByDomestic } = require('../controllers/reviewController');

// Validation pour la création d'un avis
const reviewValidation = [
  body('domesticId').isInt().withMessage('ID du domestique invalide'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('La note doit être comprise entre 1 et 5'),
  body('comment').optional().isString(),
];

// Routes
router.post('/', protect, reviewValidation, createReview);
router.get('/domestic/:domesticId', getReviewsByDomestic);

module.exports = router;