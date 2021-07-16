const router = require('express').Router();

router.get('/visualizer',(req,res)=>{
   res.render('visualizer',{user:req.user}); 
});

router.get('/visualizer/contest/:contestno',(req,res)=>{
   res.render('contestv',{user:req.user}); 
});


module.exports = router;