const User = require('./user')
const Post = require('./post')
const db = require('./database')

Post.belongsTo(User)
User.hasMany(Post)

module.exports = {User, Post, db};
