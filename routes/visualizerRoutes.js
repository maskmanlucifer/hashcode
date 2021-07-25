const router = require('express').Router();
const visualizerController = require('../controllers/visualizerController');

router.get('/visualizer', visualizerController.visualizer_main_page_get); // visualizer for page 

router.get('/visualizer/contest/:contestno',visualizerController.visualizer_contest_page); // getting visulizer main page

module.exports = router;