const { Router } = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { stringify } = require('querystring');
const router = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const fizzbuzzController = require('../controllers/fizzbuzzController');
router.use(methodOverride('_method'));

router.get('/fizz',fizzbuzzController.fizz_get);
router.get('/stl',fizzbuzzController.stl_get);
router.get('/buzz',fizzbuzzController.buzz_get);
module.exports = router;