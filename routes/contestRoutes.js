const router = require('express').Router();
const Mashup = require('../models/mashupModel');
const Lockout = require('../models/lockoutModel');
const Speedrun = require('../models/speedrunModel');

router.get('/contest',(req,res)=>{
   res.render('contest',{user:req.user}); 
});

router.get('/contest/mashup',async (req,res)=>{
   let data1 = await Mashup.find({phase:"UPCOMING"});
   let data2 = await Mashup.find({phase:"FINISHED"});
   let data3 = await Mashup.find({phase:"ONGOING"});
   res.render('mashup',{user:req.user,data1:data1,data2:data2,data3:data3}); 
});

router.get('/contest/lockout',async (req,res)=>{
   let data1 = await Lockout.find({phase:"UPCOMING"});
   let data2 = await Lockout.find({phase:"FINISHED"});
   let data3 = await Lockout.find({phase:"ONGOING"});
   res.render('lockout',{user:req.user,data1:data1,data2:data2,data3:data3}); 
});

router.get('/contest/speedrun',async (req,res)=>{
   let data1 = await Speedrun.find({phase:"UPCOMING"});
   let data2 = await Speedrun.find({phase:"FINISHED"});
   let data3 = await Speedrun.find({phase:"ONGOING"});
   res.render('speedrun',{user:req.user,data1:data1,data2:data2,data3:data3}); 
});

router.get('/contest/mashup/create',(req,res)=>{
   res.render('formMashup',{user:req.user});
});

router.get('/contest/lockout/create',(req,res)=>{
   res.render('formLockout',{user:req.user});
});

router.get('/contest/speedrun/create',(req,res)=>{
   res.render('formSpeedrun',{user:req.user});
});

router.get('/contest/mashup/:contestID/problems',(req,res)=>{
   res.render('mashupContest',{user:req.user,type:"PROBLEMS"});
});

router.get('/contest/mashup/:contestID/standing',(req,res)=>{
   res.render('mashupContest',{user:req.user,type:"STANDING"});
});

router.get('/contest/mashup/:contestID',(req,res)=>{
   res.render('mashupContest',{user:req.user,type:"PROBLEMS"});
});


router.get('/contest/lockout/:contestId',(req,res)=>{
   res.render('lockoutContest',{user:req.user});
});

router.get('/contest/speedrun/:contestId',(req,res)=>{
   res.render('speedrunContest',{user:req.user});
});

router.post('/mashup/create',async (req,res)=>{
  let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;
  let user=req.user;
  if(user === undefined) {
   res.status(400).json({ errors : 'You are not logged in' });
  } else if(!user.ishandle) {
   res.status(400).json({ errors : 'Please set your codeforces handle in profile page' });
  }  else {
     let size = await Mashup.estimatedDocumentCount();
     
    let obj = {
       contestID : size+1,
       starttimeSecond:starttime,
       durationtimeSecond: duration,
       author: user.cfusername,
       visibility : visibility,
       minRange : min_level,
       maxRange : max_level,
       phase : "UPCOMING",
       registered :[{
         handle : user.cfusername,
         email : user.googleid
       }],
       numberofProblems : no_of_problems,
       problems: [],
       rankList : []
    };

    let response = await new Mashup(obj).save();

    if(visibility === "PRIVATE") {
      res.status(201).json({ info : `Your private MASHUP # ${size+1} is created, share above link to whom you want to invite` , link : 'https://codeforces.com/' });
    } else {
      res.status(201).json({ info : `Your  MASHUP # ${size+1} is created , Enjoy the contest`});
    }
  }
  
});
module.exports = router;