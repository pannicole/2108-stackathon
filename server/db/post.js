const Sequelize = require('sequelize')
const db = require('./database')

module.exports = db.define('post', {
  description: {
    type: Sequelize.TEXT
  }
})

