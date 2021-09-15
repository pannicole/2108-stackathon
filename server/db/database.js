const Sequelize = require('sequelize')
const User = require('./user')

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate', {
  logging: false
});

module.exports = db
