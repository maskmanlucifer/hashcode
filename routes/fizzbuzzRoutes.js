const { Router } = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { stringify } = require('querystring');
const router = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(methodOverride('_method'));

router.get('/fizz',(req, res) => {
    res.render('fizz',{user:req.user});
});

router.get('/stl',(req, res) => {
    res.render('stl',{user:req.user});
});

router.get('/buzz',(req, res) => {
    res.render('buzz',{user:req.user});
});

module.exports = router;