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
router.get('/profile',authCheck, profileController.profile_get); // getting profile page 

router.post('/profile/handle/save',profileController.handle_save); // saving handle for verification

router.post('/profile/handle/verify',profileController.change_isHandle); // verifying by seeing submission

module.exports = router;