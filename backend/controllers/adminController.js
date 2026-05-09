const { Op } = require('sequelize');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Review = require('../models/Review');
const sequelize = require('../config/database');

// Liste des utilisateurs avec filtres
const getUsers = async (req, res) => {
  try {
    const { role, ville, dateDebut, dateFin } = req.query;
    const where = {};

    // Filtre par rôle
    if (role) {
      where.role = role;
    }

    // Filtre par ville => il faut joindre le profil (table Profile)
    const include = [];
    if (ville) {
      include.push({
        model: Profile,
        attributes: [],
        where: { adresse: { [Op.iLike]: `%${ville}%` } }, // recherche partielle insensible à la casse
        required: true,
      });
    }

    // Filtre par date d'inscription
    if (dateDebut || dateFin) {
      where.createdAt = {};
      if (dateDebut) where.createdAt[Op.gte] = new Date(dateDebut);
      if (dateFin) where.createdAt[Op.lte] = new Date(dateFin);
    }

    const users = await User.findAll({
      where,
      include: ville ? include : [{ model: Profile, attributes: ['adresse'] }],
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });

    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un utilisateur (et son profil, ses avis)
const deleteUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findByPk(req.params.id, { transaction });
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Supprimer le profil associé s'il existe
    await Profile.destroy({ where: { userId: user.id }, transaction });

    // Supprimer les avis où l'utilisateur est reviewer ou domestic
    await Review.destroy({
      where: {
        [Op.or]: [{ reviewerId: user.id }, { domesticId: user.id }],
      },
      transaction,
    });

    // Enfin, supprimer l'utilisateur
    await user.destroy({ transaction });

    await transaction.commit();
    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Statistiques globales
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalDomestics = await User.count({ where: { role: 'domestic' } });
    const totalEmployers = await User.count({ where: { role: 'employer' } });
    const totalAdmins = await User.count({ where: { role: 'admin' } });
    const totalProfiles = await Profile.count();
    const totalReviews = await Review.count();

    res.json({
      totalUsers,
      totalDomestics,
      totalEmployers,
      totalAdmins,
      totalProfiles,
      totalReviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getUsers, deleteUser, getStats };