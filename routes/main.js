const router = require('express').Router();
const {
  createMain,
  updateTitleMain,
  updateTextMain,
  updatePhotoMain,
} = require('../controllers/main');
const {
  createMainValidation,
  updateTitleMainValidation,
  updateTextMainValidation,
  updatePhotoMainValidation,
} = require('../middlewares/validation');

// создаем объект с с информацией для главной странички
router.post('/main', createMainValidation, createMain);
router.put('/main-title', updateTitleMainValidation, updateTitleMain);
router.put('/main-text', updateTextMainValidation, updateTextMain);
router.put('/main-photo', updatePhotoMainValidation, updatePhotoMain);
module.exports = router;
