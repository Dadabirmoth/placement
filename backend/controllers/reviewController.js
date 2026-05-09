const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const User = require('../models/User');

// Créer un avis (employeur seulement)
const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Seul un employeur peut laisser un avis.' });
  }

  const { domesticId, rating, comment } = req.body;

  // Vérifier que le domestique existe et a bien le rôle 'domestic'
  try {
    const domestic = await User.findByPk(domesticId);
    if (!domestic || domestic.role !== 'domestic') {
      return res.status(404).json({ message: 'Domestique non trouvé.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }

  try {
    const review = await Review.create({
      reviewerId: req.user.id,
      domesticId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir tous les avis pour un domestique
const getReviewsByDomestic = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { domesticId: req.params.domesticId },
      include: {
        model: User,
        as: 'reviewer',
        attributes: ['nom', 'prenom'],
      },
      order: [['createdAt', 'DESC']],
    });

    // Calculer la note moyenne et le nombre d'avis
    const count = reviews.length;
    const average =
      count > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
        : 0;

    res.json({
      count,
      average: Math.round(average * 10) / 10, // arrondi à 1 décimale
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createReview, getReviewsByDomestic };