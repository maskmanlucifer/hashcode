const router = require('express').Router();

router.get('/visualizer',(req,res)=>{
   res.render('visualizer',{user:req.user}); 
});

module.exports = router;