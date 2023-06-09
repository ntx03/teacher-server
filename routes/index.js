const router = require('express').Router();
const usersRouter = require('./users');
const newsRouter = require('./news');
const mainRouter = require('./main');
const photoRouter = require('./photo');
const videoRouter = require('./video');
const getData = require('./getData');
const NotFound = require('../errors/NotFound');
const {
  validationLogin,
  createUserValid,
} = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/api/signin', validationLogin, login);
router.post('/api/signup', createUserValid, createUser);
router.use('/api', getData);
router.use(auth);
router.use('/api', mainRouter);
router.use('/api', usersRouter);
router.use('/api', newsRouter);
router.use('/api', photoRouter);
router.use('/api', videoRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не существует!'));
});

module.exports = router;
