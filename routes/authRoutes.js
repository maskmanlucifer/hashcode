const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');


router.get('/logout', authController.logout_get);
 
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile');
})
;
module.exports = router;