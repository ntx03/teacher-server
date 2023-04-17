const router = require('express').Router();

const { getUser } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

module.exports = router;
