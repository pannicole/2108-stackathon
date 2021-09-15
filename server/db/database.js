const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate', {
  logging: false
});

const Post = db.define('post', {
  description: {
    type: Sequelize.TEXT
  }
})

const User = db.define('user', {
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Post.belongsTo(User)
User.hasMany(Post)

module.exports = {User, Post, db};
