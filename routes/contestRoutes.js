const router = require('express').Router();

router.get('/contest',(req,res)=>{
   res.render('contest',{user:req.user}); 
});

router.get('/contest/mashup',(req,res)=>{
   res.render('mashup',{user:req.user}); 
});

router.get('/contest/lockout',(req,res)=>{
   res.render('lockout',{user:req.user}); 
});

router.get('/contest/speedrun',(req,res)=>{
   res.render('speedrun',{user:req.user}); 
});

module.exports = router;