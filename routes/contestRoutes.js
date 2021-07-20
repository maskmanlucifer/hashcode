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
module.exports = router;