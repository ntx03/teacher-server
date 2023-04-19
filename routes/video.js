const router = require('express').Router();

const {
  createVideo,
  createVideoSchool,
  deleteVideo,
  deleteVideoSchool,
} = require('../controllers/video');

const {
  validationQuery,
  createVideoValidation,
} = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
router.post('/video', createVideoValidation, createVideo);
router.delete('/video', validationQuery, deleteVideo);
router.post('/video-school', createVideoValidation, createVideoSchool);
router.delete('/video-school', validationQuery, deleteVideoSchool);

module.exports = router;
