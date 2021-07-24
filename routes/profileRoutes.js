const router = require('express').Router();

const profileController = require('../controllers/profileController');

// for authorized pages
const authCheck = (req,res,next)=> {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

// getting profile main page 
router.get('/profile',authCheck, profileController.profile_get);

router.post('/profile/handle/save',profileController.verify);

router.post('/profile/handle/verify',profileController.change_isHandle);

module.exports = router;