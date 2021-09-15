const router = require('express').Router();
const { User, Post, db } = require('./db')

// matches GET requests to /api/posts/
router.get('/', async function (req, res, next) {
  try{
    const allPosts = await Post.findAll({
      include: {
        model: User
      }
    })
    res.send(allPosts)
  } catch(err) {
    next(err)
  }
});
// matches POST requests to /api/posts/
router.post('/', async function (req, res, next) {
  res.send("post posts request")
});
// matches PUT requests to /api/posts/:postId
router.put('/:postId', function (req, res, next) {
  res.send("put posts request")
});
// matches DELETE requests to /api/posts/:postId
router.delete('/:postId', function (req, res, next) {
  res.send("delete posts request")
});

module.exports = router;
