const router = require('express').Router();
const Mashup = require('../models/mashupModel');
const Lockout = require('../models/lockoutModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

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


router.get('/contest/mashup/create',(req,res)=>{
   res.render('formMashup',{user:req.user});
});

router.get('/contest/lockout/create',(req,res)=>{
   res.render('formLockout',{user:req.user});
});

router.get('/contest/mashup/:contestno/register', async (req,res)=>{
  let contest = req.params.contestno;
  let contestno = Number(contest);
  let user = req.user;
  
  if(user === undefined) {
   let error = {
      server_error : undefined,
      login_error : 'You are not logged in',
      cfhandle_error : undefined,
      visualizer_error : undefined

   };
   res.render('error',{data:error,user:req.user});
  } else if(!user.ishandle) {
   let error = {
      server_error : undefined,
      login_error : undefined,
      cfhandle_error : 'Please verify your codeforces username in profile section',
      visualizer_error : undefined

   };
   res.render('error',{data:error,user:req.user});
  }  else {
     let obj ={
        handle:user.cfusername,
        email:user.googleid
     };
     
     let data = await Mashup.find({contestID: contestno});
     let flag =0;
     for(let i=0;i<data[0].registered.length;i++) {
        if(data[0].registered[i].email == user.googleid) {
           flag =1;
        }
     }
     if(flag == 0 ){
     await Mashup.findOneAndUpdate({ contestID: contestno},{ $push: { "registered" : obj }});
     res.redirect('/contest/mashup');
     } else {
      let error = {
         server_error : undefined,
         login_error : 'You are already registered',
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
     }
     
     
  }
  
});

router.get('/contest/mashup/:contestno/registered',async (req,res)=>{
   let contest = req.params.contestno;
   let contestno = Number(contest);
   let data = await Mashup.find({contestID:contestno});
   res.render('registrants',{user:req.user,data:data[0]});
})
router.get('/contest/lockout/:contestno/register', async (req,res)=>{
   let contest = req.params.contestno;
   let contestno = Number(contest);
   let user = req.user;
   
   if(user === undefined) {
      let error = {
         server_error : undefined,
         login_error : 'You are not logged in',
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
     } else if(!user.ishandle) {
      let error = {
         server_error : undefined,
         login_error : undefined,
         cfhandle_error : 'Please verify your codeforces username in profile section',
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
     }  else {

      let obj ={
         handle:user.cfusername,
         email:user.googleid
      };
      let data = await Lockout.find({contestID: contestno});
      
      if((data[0].opponent.email== "undefined") && (data[0].creator.email != user.googleid)) {
      await Lockout.findOneAndUpdate({ contestID: contestno},{ $set: { "opponent" : obj }});
      res.redirect('/contest/lockout');
      } else {
         let error = {
            server_error : undefined,
            login_error : 'You are already registered',
            cfhandle_error : undefined,
            visualizer_error : undefined
      
         };
         res.render('error',{data:error,user:req.user});
      }
      
      
   }
   
 });

 router.get('/contest/private/register/:code',async(req,res)=>{
    let user = req.user;
   if(user === undefined) {
      let error = {
         server_error : undefined,
         login_error : 'You are not logged in',
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
     } else if(!user.ishandle) {
      let error = {
         server_error : undefined,
         login_error : undefined,
         cfhandle_error : 'Please verify your codeforces username in profile section',
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
     } else {
   let code = req.params.code;
   jwt.verify(code, process.env.JWT_KEY, async (e, decoded) => {
      if (e) {
          let error = {
            server_error : 'Server error occured',
            login_error : undefined,
            cfhandle_error : undefined,
            visualizer_error : undefined
      
         };
         res.render('error',{data:error,user:req.user});
      } else {
          let contestno = Number(decoded.id);
          let type = String(decoded.type);
          if(type == "MASHUP") {
            let obj ={
               handle:user.cfusername,
               email:user.googleid
            };
            
            let data = await Mashup.find({contestID: contestno});
            let flag =0;
            for(let i=0;i<data[0].registered.length;i++) {
               if(data[0].registered[i].email == user.googleid) {
                  flag =1;
               }
            }
            if(flag == 0 ){
            await Mashup.findOneAndUpdate({ contestID: contestno},{ $push: { "registered" : obj }});
            res.redirect('/contest/mashup');
            } else {
               let error = {
                  server_error : undefined,
                  login_error : 'You are already registered',
                  cfhandle_error : undefined,
                  visualizer_error : undefined
            
               };
               res.render('error',{data:error,user:req.user});
            }
            
            
          }
          else {
            let obj ={
               handle:user.cfusername,
               email:user.googleid
            };
            let data = await Lockout.find({contestID: contestno});
            if((data[0].opponent.email== "undefined") && (data[0].creator.email != user.googleid)) {
            await Lockout.findOneAndUpdate({ contestID: contestno},{ $set: { "opponent" : obj }});
            res.redirect('/contest/lockout');
            } else {
               let error = {
                  server_error : undefined,
                  login_error : 'You are already registered',
                  cfhandle_error : undefined,
                  visualizer_error : undefined
            
               };
               res.render('error',{data:error,user:req.user});
            }
            
            
          }
      }
  });
  }
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

router.get('/contest/mashup/:contestno/registrants',(req,res)=>{
   res.render('registrants',{user:req.user});
})
router.post('/contest/mashup/create',async (req,res)=>{
  let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;
  let user=req.user;

  if(user === undefined) {
   res.status(400).json({ contestError : 'You are not logged in' });
  } else if(!user.ishandle) {
   res.status(400).json({ contestError : 'Please set your codeforces handle in profile page' });
  }  else {
     let size = await Mashup.estimatedDocumentCount();
     let mi =Math.min(min_level,max_level);
     let ma= Math.max(min_level,max_level);
     min_level=mi;
     max_level=ma;
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
      let secret={
         "id":String(size+1),
         "type":"MASHUP"
       }
      const code=jwt.sign(secret,process.env.JWT_KEY,{
         expiresIn:'30d'
      });
      let url = `http://localhost:3000/contest/private/register/`
      url += code;
      res.status(201).json({ contestError:'contest created scroll down to see your contest details',info : `Your private MASHUP # ${size+1} is created, share above link to whom you want to invite` , link : url });
    } else {
      res.status(201).json({ contestError:'contest created scroll down to see your contest details',info : `Your  MASHUP # ${size+1} is created , Enjoy the contest`});
    }
    }
  
});

router.post('/contest/lockout/create',async (req,res)=>{
   let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;
   let user=req.user;
 
   if(user === undefined) {
    res.status(400).json({ contestError : 'You are not logged in' });
   } else if(!user.ishandle) {
    res.status(400).json({ contestError : 'Please set your codeforces handle in profile page' });
   }  else {
      let size = await Lockout.estimatedDocumentCount();
      let mi =Math.min(min_level,max_level);
      let ma= Math.max(min_level,max_level);
      min_level=mi;
      max_level=ma;
     
      let obj = {
         contestID : size+1,
         starttimeSecond:starttime,
         durationtimeSecond: duration,
         author: user.cfusername,
         visibility : visibility,
         minRange : min_level,
         maxRange : max_level,
         phase : "UPCOMING",
         creator : {handle : user.cfusername,
           email : user.googleid},
         opponent : {
            handle:"",
            email : "undefined"
         },
         numberofProblems : no_of_problems,
         problems: [],
         rankList : []
      };
     let response = await new Lockout(obj).save();
     
     if(visibility === "PRIVATE") {
      const salt = await bcrypt.genSalt();
      let code = await bcrypt.hash(String(size+1), salt);
      let url = `http://localhost:3000/contest/lockout/${size+1}/register/`
      url += code;
       res.status(201).json({ contestError:'contest created scroll down to see your contest details',info : `Your private Lockout # ${size+1} is created, share above link to whom you want to invite` , link : url });
     } else {
       res.status(201).json({ contestError:'contest created scroll down to see your contest details',info : `Your  Lockout # ${size+1} is created , Enjoy the contest`});
     }
     }
   
 });
module.exports = router;