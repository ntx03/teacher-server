const router = require('express').Router();

const { createPhoto, deletePhoto } = require('../controllers/photo');
const {
  validationQuery,
  createPhotoBlockValidation,
} = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
router.post('/photo', createPhotoBlockValidation, createPhoto);
router.delete('/photo', validationQuery, deletePhoto);

module.exports = router;
