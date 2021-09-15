const router = require('express').Router();
const { User, Post, db } = require('./db/database')

// matches GET requests to /api/users/
router.get('/', async function (req, res, next) {
  const allUsers = await User.findAll({
    include: {
      model: Post
    }
  })
  res.send(allUsers)
});
// matches POST requests to /api/users/
router.post('/', function (req, res, next) {
  res.send("post users request")
});
// matches PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next) {
  res.send("put users request")
});
// matches DELETE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next) {
  res.send("delete users request")
});

module.exports = router;
