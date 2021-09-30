const Sequelize = require('sequelize')
const db = require('./database')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

User.prototype.correctPassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

User.prototype.generateToken = function () {
  console.log('lksjdlfkasdjflkasjdf here')
  return jwt.sign({id: this.id}, process.env.JWT)
}

// class methods
User.authenticate = async function ({username, password}) {
  const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
};

// hooks
const hashPassword = async(user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}
module.exports = User
