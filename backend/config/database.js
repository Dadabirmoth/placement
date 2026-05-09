const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // passer à console.log pour voir les requêtes SQL
});

module.exports = sequelize;