const router = require('express').Router();
const authCheck = (req,res,next)=> {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};
router.get('/profile',authCheck,(req,res)=>{
   res.render('profile',{user:req.user}); 
});

module.exports = router;