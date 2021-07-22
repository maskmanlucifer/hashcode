const { Router } = require('express');
const fizzbuzzController = require('../controllers/fizzbuzzController');
const router = Router();

router.get('/fizz', fizzbuzzController.fizz_get);

router.get('/stl', fizzbuzzController.stl_get);

router.get('/buzz', fizzbuzzController.buzz_get);

module.exports = router;