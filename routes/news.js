const router = require('express').Router();
// const { updateProfileUserValidation } = require('../middlewares/validation');
const { createNews, deleteNews } = require('../controllers/news');
const { createPhotoValidation } = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
router.post('/news', createPhotoValidation, createNews);
router.delete('/news', deleteNews);

module.exports = router;
