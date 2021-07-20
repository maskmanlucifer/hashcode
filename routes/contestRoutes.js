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
  let user= 0;
  if(!user) {
   res.status(400).json({ errors : 'You are not logged in' ,user:0});
//   } else if(!user.cfusername) {
//    res.status(400).json({ errors : 'Please set your codeforces handle in profile page' });
  }  else {
    
     let size = await Mashup.estimatedDocumentCount();
     
    let obj = {
      contestID : size+1,
       starttimeSecond:{
         type: Number
       },
       durationtimeSecond: {
         type: Number
       },
       author:{
         type: String
       },
       visibility : {
         type: String
       },
       minRange : {
         type:Number
       },
       maxRange : {
           type : Number
       },
       phase : {
         type : String
       },
       registered :[{
         handle : String,
         email : String
       }],
       numberofProblems : {
           type : Number
       },
       problems: [{
           contestID: Number,
           index : String,
           points : Number
       }],
       rankList : [{
           handle: String,
           points : Number,
           problemResults : [{
               contestID: Number,
               submissionID: Number
           }]
       }]
    };
    res.status(201).json({ user:1 });
  }
  
});
module.exports = router;