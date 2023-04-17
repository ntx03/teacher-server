const router = require('express').Router();

const { allNews } = require('../controllers/news');

router.get('/news', allNews);

module.exports = router;
