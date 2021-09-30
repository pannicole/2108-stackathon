const router = require('express').Router();

router.use('/users', require('./users')); // matches all requests to /api/users/
router.use('/posts', require('./posts')); // matches all requests to  /api/posts/
const { User, Post, db } = require('./db')


router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log('signup route')
    const user = await User.create(req.body)
    console.log('created user')
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});


module.exports = router;
