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

module.exports = router;