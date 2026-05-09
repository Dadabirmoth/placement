const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');

// Créer le profil du domestique connecté
const createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Vérifier que l'utilisateur est bien un domestique
  if (req.user.role !== 'domestic') {
    return res.status(403).json({ message: 'Seul un domestique peut créer un profil.' });
  }

  // Vérifier qu'il n'a pas déjà un profil
  const existing = await Profile.findOne({ where: { userId: req.user.id } });
  if (existing) {
    return res.status(400).json({ message: 'Vous avez déjà un profil.' });
  }

  const { dateNaissance, lieuNaissance, telephone, adresse, numeroCNI } = req.body;

  try {
    const profile = await Profile.create({
      userId: req.user.id,
      dateNaissance,
      lieuNaissance,
      telephone,
      adresse,
      numeroCNI,
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir son propre profil
const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
      include: { model: User, attributes: ['nom', 'prenom', 'email'] },
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé.' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour son profil
const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé.' });
    }

    const { dateNaissance, lieuNaissance, telephone, adresse, numeroCNI } = req.body;
    await profile.update({
      dateNaissance: dateNaissance || profile.dateNaissance,
      lieuNaissance: lieuNaissance || profile.lieuNaissance,
      telephone: telephone || profile.telephone,
      adresse: adresse || profile.adresse,
      numeroCNI: numeroCNI || profile.numeroCNI,
    });

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Voir le profil public d'un domestique (sans token)
const getPublicProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: { model: User, attributes: ['nom', 'prenom'] },
    });
    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé.' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { createProfile, getMyProfile, updateProfile, getPublicProfile };