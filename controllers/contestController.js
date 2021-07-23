const Mashup = require('../models/mashupModel');
const Lockout = require('../models/lockoutModel');
const jwt=require('jsonwebtoken');


// contest landing page 
module.exports.contest_landing_page = (req,res)=>{
    res.render('contest',{user:req.user}); 
};

// mashup contest landing page 
module.exports.mashup_landing_page = async (req,res)=>{

    let data1 = await Mashup.find({phase:"UPCOMING"});
    let data2 = await Mashup.find({phase:"FINISHED"});
    let data3 = await Mashup.find({phase:"ONGOING"});

    res.render('mashup',{user:req.user,data1:data1,data2:data2,data3:data3}); 
};


// lockout contest landing page 
module.exports.lockout_landing_page = async (req,res)=>{
    let data1 = await Lockout.find({phase:"UPCOMING"});
    let data2 = await Lockout.find({phase:"FINISHED"});
    let data3 = await Lockout.find({phase:"ONGOING"});
    res.render('lockout',{user:req.user,data1:data1,data2:data2,data3:data3}); 
};

module.exports.mashup_form = (req,res)=>{
    res.render('formMashup',{user:req.user});
};

module.exports.lockout_form = (req,res)=>{
    res.render('formLockout',{user:req.user});
};

module.exports.mashup_registered_users = async (req,res) => {

    let contest = req.params.contestno;
    let contestno = Number(contest);
    let data = await Mashup.find({contestID:contestno});
    if(data.length==0) {
      let error = {
         server_error : 'This contest does not exist',
         login_error : undefined,
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
    } else {
    res.render('registrants',{user:req.user,data:data[0]});
    }
};

module.exports.mashup_register_public = async (req,res) => {

    // extract contestID from url
    let contest = req.params.contestno;
    let contestno = Number(contest);
    let user = req.user;
    
    // if user is not logged 
    if(user === undefined) {
     let error = {
        server_error : undefined,
        login_error : 'You are not logged in',
        cfhandle_error : undefined,
        visualizer_error : undefined
  
     };
     res.render('error',{data:error,user:req.user});
    
    // if user haven't added codeforces handle
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

       if(data.length > 0) {
       let flag =0;
       for(let i=0;i<data[0].registered.length;i++) {
          if(data[0].registered[i].email == user.googleid) {
             flag =1;
          }
       }
       
       if(flag == 0 ) {
       await Mashup.findOneAndUpdate({ contestID: contestno},{ $push: { "registered" : obj }});
       res.redirect('/contest/mashup');

       } else {
        // if user is already registered
        let error = {
           server_error : undefined,
           login_error : 'You are already registered',
           cfhandle_error : undefined,
           visualizer_error : undefined
     
        };

        res.render('error',{data:error,user:req.user});

       }
   } else {
      let error = {
         server_error : 'Contest does not exist',
         login_error : undefined,
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
   }
}
    
};

module.exports.lockout_register_public = async (req,res)=>{

    let contest = req.params.contestno;
    let contestno = Number(contest);
    let user = req.user;
    
    // if user is not logged in
    if(user === undefined) {
       let error = {
          server_error : undefined,
          login_error : 'You are not logged in',
          cfhandle_error : undefined,
          visualizer_error : undefined
    
       };
       res.render('error',{data:error,user:req.user});

      // if handle is not provided  
      } else if(!user.ishandle) {
       let error = {
          server_error : undefined,
          login_error : undefined,
          cfhandle_error : 'Please verify your codeforces username in profile section',
          visualizer_error : undefined
    
       };
       res.render('error',{data:error,user:req.user});


      }  else {
 
       let obj = {
          handle:user.cfusername,
          email:user.googleid
       };
       let data = await Lockout.find({contestID: contestno});
       
       if(data.length > 0) {
       if((data[0].opponent.email== "undefined") && (data[0].creator.email != user.googleid)) {

       await Lockout.findOneAndUpdate({ contestID: contestno},{ $set: { "opponent" : obj }});

       res.redirect('/contest/lockout');
       
       // if user is already registered
       } else {
            if(data[0].creator.email == user.googleid)
            {
               let error = {
                  server_error : undefined,
                  login_error : 'You are already registered',
                  cfhandle_error : undefined,
                  visualizer_error : undefined
            
               };
               res.render('error',{data:error,user:req.user});
            }
            else
            {
               let error = {
                  server_error : undefined,
                  login_error : 'Lockout is full',
                  cfhandle_error : undefined,
                  visualizer_error : undefined
            
               };
               res.render('error',{data:error,user:req.user});
            }
       }
    } else {
      let error = {
         server_error : 'Contest does not exist',
         login_error : undefined,
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
    }
   } 
};

module.exports.lockout_mashup_register_private = async(req,res)=>{
   let user = req.user;
   
   // if user is not logged in
   if(user === undefined) {
      let error = {
         server_error : undefined,
         login_error : 'You are not logged in',
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});

     // if user havent set codeforces handle
     } else if(!user.ishandle) {
      let error = {
         server_error : undefined,
         login_error : undefined,
         cfhandle_error : 'Please verify your codeforces username in profile section',
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
      
     } else {
      // getting code from url
      let code = req.params.code;

      // varifying code

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

          // extract contest by decoding 
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
               if(data[0].creator.email == user.googleid)
               {
                  let error = {
                     server_error : undefined,
                     login_error : 'You are already registered',
                     cfhandle_error : undefined,
                     visualizer_error : undefined
               
                  };
                  res.render('error',{data:error,user:req.user});
               }
               else
               {
                  let error = {
                     server_error : undefined,
                     login_error : 'Lockout is full',
                     cfhandle_error : undefined,
                     visualizer_error : undefined
               
                  };
                  res.render('error',{data:error,user:req.user});
               }
               
            }
          }
      }
  });
  }
};

module.exports.mashup_create = async (req,res)=>{
    let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;
    let user=req.user;
    
    // if user is not logged in
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
  
      await new Mashup(obj).save();
  
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
};

module.exports.lockout_create = async (req,res)=>{

    let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;
    let user=req.user;
  
    // if user is not logged in
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

      await new Lockout(obj).save();
      
      if(visibility === "PRIVATE") {

        let secret={
            "id":String(size+1),
            "type":"LOCKOUT"
          }
         const code=jwt.sign(secret,process.env.JWT_KEY,{
            expiresIn:'30d'
         });
       let url = `http://localhost:3000/contest/private/register/`

       url += code;
        res.status(201).json({ contestError:'contest created scroll down to see your contest details',info : `Your private Lockout # ${size+1} is created, share above link to whom you want to invite` , link : url });
      } else {
        res.status(201).json({ contestError:'contest created scroll down to see your contest details',info : `Your  Lockout # ${size+1} is created , Enjoy the contest`});
      }
      }
};

 
module.exports.mashup_contest_landing_page_problems = async (req,res) => {

   let contest = req.params.contestID;
   let contestno = Number(contest);
   let data1 = await Mashup.find({contestID:contestno});
   if(data1.length == 0) {
      let error = {
         server_error : 'Contest does not exist',
         login_error : undefined,
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
   } else {
   let data = data1[0];
   if(data.visibility == "PRIVATE") {
      let flag = 0;
      if(user && user.ishandle) {
         for(let i=0;i<data.registered.length;i++) {
            if(data.registered[i].handle == user.cfusername) {
               flag =1 
               break;
            }
         }
      }

      if(flag == 0) {
            let error = {
               server_error : 'You can not access this page',
               login_error : undefined,
               cfhandle_error : undefined,
               visualizer_error : undefined
         
            };
            res.render('error',{data:error,user:req.user});
      } else {
         if(data.phase == "UPCOMING") {
            let error = {
               server_error : 'Contest is still in upcoming phase',
               login_error : undefined,
               cfhandle_error : undefined,
               visualizer_error : undefined
         
            };
            res.render('error',{data:error,user:req.user});
         } else {
         res.render('mashupContest',{user:req.user,data:data,type:"PROBLEMS"}); 
         }
      }
   } else {
      if(data.phase == "UPCOMING") {
         let error = {
            server_error : 'Contest is still in upcoming phase',
            login_error : undefined,
            cfhandle_error : undefined,
            visualizer_error : undefined
      
         };
         res.render('error',{data:error,user:req.user});
      } else {
      res.render('mashupContest',{user:req.user,data:data,type:"PROBLEMS"}); 
      }
   }
   
   }
};

module.exports.mashup_contest_landing_page_standing = async (req,res) => {

   let contest = req.params.contestID;
   let contestno = Number(contest);
   let data1 = await Mashup.find({contestID:contestno});

   if(data1.length == 0) {
      let error = {
         server_error : 'Contest does not exist',
         login_error : undefined,
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
   } else {
   let data = data1[0];
   if(data.visibility == "PRIVATE") {
      let flag = 0;
      if(user && user.ishandle) {
         for(let i=0;i<data.registered.length;i++) {
            if(data.registered[i].handle == user.cfusername) {
               flag =1 
               break;
            }
         }
      }

      if(flag == 0) {
            let error = {
               server_error : 'You can not access this page',
               login_error : undefined,
               cfhandle_error : undefined,
               visualizer_error : undefined
         
            };
            res.render('error',{data:error,user:req.user});
      } else {
         if(data.phase == "UPCOMING") {
            let error = {
               server_error : 'Contest is still in upcoming phase',
               login_error : undefined,
               cfhandle_error : undefined,
               visualizer_error : undefined
         
            };
            res.render('error',{data:error,user:req.user});
         } else {
         res.render('mashupContest',{user:req.user,data:data,type:"STANDING"}); 
         }
      }
   } else {
      if(data.phase == "UPCOMING") {
         let error = {
            server_error : 'Contest is still in upcoming phase',
            login_error : undefined,
            cfhandle_error : undefined,
            visualizer_error : undefined
      
         };
         res.render('error',{data:error,user:req.user});
      } else {
      res.render('mashupContest',{user:req.user,data:data,type:"STANDING"}); 
      }
   }
   
   }

};

// lockout 

module.exports.lockout_contest_landing_page = async (req,res) => {

   let contest = req.params.contestID;
   let contestno = Number(contest);
   let data1 = await Lockout.find({contestID:contestno});
   if(data1.length == 0) {
      let error = {
         server_error : 'Contest does not exist',
         login_error : undefined,
         cfhandle_error : undefined,
         visualizer_error : undefined
   
      };
      res.render('error',{data:error,user:req.user});
   } else {
   let data = data1[0];
   if(data.visibility == "PRIVATE") {
      let flag = 0;
      if(user && user.ishandle) {
         if(user.cfusername == creator.handle) {
            flag =1;
         }
         if(data.opponent.email != "undefined"  && data.opponent.handle == user.cfusername) {
            flag = 1;
         }
      }

      if(flag == 0) {
            let error = {
               server_error : 'You can not access this page',
               login_error : undefined,
               cfhandle_error : undefined,
               visualizer_error : undefined
         
            };
            res.render('error',{data:error,user:req.user});
      } else {
         if(data.phase == "UPCOMING") {
            let error = {
               server_error : 'Contest is still in upcoming phase',
               login_error : undefined,
               cfhandle_error : undefined,
               visualizer_error : undefined
         
            };
            res.render('error',{data:error,user:req.user});
         } else {
         res.render('lockoutContest',{user:req.user,data:data,type:"PROBLEMS"}); 
         }
      }
   } else {
      if(data.phase == "UPCOMING") {
         let error = {
            server_error : 'Contest is still in upcoming phase',
            login_error : undefined,
            cfhandle_error : undefined,
            visualizer_error : undefined
      
         };
         res.render('error',{data:error,user:req.user});
      } else {
      res.render('lockoutContest',{user:req.user,data:data}); 
      }
   }
   
   }
};

