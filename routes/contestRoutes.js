const router = require('express').Router();

router.get('/contest',(req,res)=>{
   res.render('visualizer',{user:req.user}); 
});

module.exports = router;