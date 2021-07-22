const router = require('express').Router();
const visualizerController = require('../controllers/visualizerController');

router.get('/visualizer', visualizerController.visualizer_main_page_get);

router.get('/visualizer/contest/:contestno',visualizerController.visualizer_contest_page);

module.exports = router;