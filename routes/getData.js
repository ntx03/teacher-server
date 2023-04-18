const router = require('express').Router();

const { allNews } = require('../controllers/news');
const { allMain } = require('../controllers/main');
const { allPhoto } = require('../controllers/photo');

router.get('/news', allNews);
router.get('/main', allMain);
router.get('/photo', allPhoto);

module.exports = router;
