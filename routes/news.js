const router = require('express').Router();
// const { updateProfileUserValidation } = require('../middlewares/validation');
const { createNews, deleteNews } = require('../controllers/news');
const {
  validationParamsDeleteMovie,
  createPhotoValidation,
} = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
router.post('/news', createPhotoValidation, createNews);
router.delete('/news', validationParamsDeleteMovie, deleteNews);

module.exports = router;
