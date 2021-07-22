const router = require('express').Router();

const contestController = require('../controllers/contestController');

router.get('/contest', contestController.contest_landing_page);

router.get('/contest/mashup', contestController.mashup_landing_page);

router.get('/contest/lockout', contestController.lockout_landing_page);

router.get('/contest/mashup/create', contestController.mashup_form);

router.get('/contest/lockout/create', contestController.lockout_form);

router.get('/contest/mashup/:contestno/register', contestController.mashup_register_public);

router.get('/contest/mashup/:contestno/registered', contestController.mashup_registered_users);

router.get('/contest/lockout/:contestno/register', contestController.lockout_register_public );

router.get('/contest/private/register/:code', contestController.lockout_mashup_register_private);

router.post('/contest/mashup/create', contestController.mashup_create);

router.post('/contest/lockout/create', contestController.lockout_create);

// router.get('/contest/mashup/:contestID/problems',(req,res)=>{
//    res.render('mashupContest',{user:req.user,type:"PROBLEMS"});
// });

// router.get('/contest/mashup/:contestID/standing',(req,res)=>{
//    res.render('mashupContest',{user:req.user,type:"STANDING"});
// });

// router.get('/contest/mashup/:contestID',(req,res)=>{
//    res.render('mashupContest',{user:req.user,type:"PROBLEMS"});
// });


module.exports = router;