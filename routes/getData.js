const router = require('express').Router();

const { allNews } = require('../controllers/news');
const { allMain } = require('../controllers/main');
const { allPhoto } = require('../controllers/photo');
const { allVideo, allVideoSchool } = require('../controllers/video');

router.get('/app/news', allNews);
router.get('/main', allMain);
router.get('/photo', allPhoto);
router.get('/video', allVideo);
router.get('/video-school', allVideoSchool);

module.exports = router;
