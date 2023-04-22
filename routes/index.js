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

router.post('/signin', validationLogin, login);
router.post('/signup', createUserValid, createUser);
router.use('/app', getData);
router.use(auth);
router.use('/', mainRouter);
router.use('/', usersRouter);
router.use('/', newsRouter);
router.use('/', photoRouter);
router.use('/', videoRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не существует'));
});

module.exports = router;
