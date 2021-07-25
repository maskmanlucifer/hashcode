const { Router } = require('express');
const fizzbuzzController = require('../controllers/fizzbuzzController');
const router = Router();

router.get('/fizz', fizzbuzzController.fizz_get); // fizz page

router.get('/stl', fizzbuzzController.stl_get);  // stl page

router.get('/buzz', fizzbuzzController.buzz_get); // buzz page

module.exports = router;