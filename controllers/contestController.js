const Mashup = require('../models/mashupModel');
const Lockout = require('../models/lockoutModel');
const User = require('../models/userModel');
require('dotenv').config();
const jwt=require('jsonwebtoken');


// contest (mashup+lockout) common page 
module.exports.contest_landing_page = (req,res)=> {
    res.render('contest',{user:req.user}); 
};
 
// mashup contest main page 
module.exports.mashup_landing_page = async (req,res)=>{
    let data = await Mashup.find();
    res.render('mashup',{user:req.user,data:data}); 
};


// lockout contest main page 
module.exports.lockout_landing_page = async (req,res)=>{
    let data = await Lockout.find();
    res.render('lockout',{user:req.user,data:data}); 
};

// mashup form page
module.exports.mashup_form = (req,res)=>{
    res.render('formMashup',{user:req.user});
};

// lockout form page
module.exports.lockout_form = (req,res)=>{
    res.render('formLockout',{user:req.user});
};

// mashup create 
module.exports.mashup_create = async (req,res) => {

    let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;
    let user=req.user;
    
    // if user is not logged in
    if(user === undefined) 
    {
      res.status(400).json({ contestError : 'You are not logged in' });
    } 
    else if(!user.isHandle) 
    {
      res.status(400).json({ contestError : 'Please set your codeforces handle in profile page' });
    }  
    else 
    {

       let size = await Mashup.estimatedDocumentCount();
       let mi =Math.min(min_level,max_level);
       let ma= Math.max(min_level,max_level);

       min_level=mi;
       max_level=ma;

       let obj = {
        contestId : size+1,
        starttimeSecond:starttime,
        durationtimeSecond: duration,
        visibility : visibility,
        minRange : min_level,
        maxRange : max_level,
        registered :[{
          handle : user.cfHandle,
          googleId : user.googleId
        }],
        numberofProblems : no_of_problems,
        problems: [],
        rankList: []
     };
  
      await new Mashup(obj).save();
      await User.findOneAndUpdate({googleId:user.googleId},{$push:{"contestList" : {type:"mashup",contestId:size+1}}});
      if(visibility === "PRIVATE") 
      {
        let secret = {
           "id":String(size+1),
           "type":"MASHUP"
         };

        const code=jwt.sign(secret,process.env.JWT_KEY,{
           expiresIn:'30d'
        });

        let url = process.env.origin + `/contest/private/register/`
        url += code;
        res.status(201).json({ contestError:'Contest created scroll down to see your contest details',info : `Your private MASHUP # ${size+1} is created, share above link to whom you want to invite` , link : url });

      } 
      else 
      {
        res.status(201).json({ contestError:'Contest created scroll down to see your contest details',info : `Your  MASHUP # ${size+1} is created , Enjoy the contest`});

      }
    }  
};

// lockout create 
module.exports.lockout_create = async (req,res)=> {

    let {duration,min_level,max_level,starttime,no_of_problems,visibility} = req.body;

    let user=req.user;
  
    // if user is not logged in
    if(user === undefined) 
    {
      res.status(400).json({ contestError : 'You are not logged in' });
    } 
    else if(!user.isHandle) 
    {
      res.status(400).json({ contestError : 'Please set your codeforces handle in profile page' });
    }  
    else 
    {

       let size = await Lockout.estimatedDocumentCount();
       let mi =Math.min(min_level,max_level);
       let ma= Math.max(min_level,max_level);

       min_level=mi;
       max_level=ma;
      
       let obj = {
          contestId : size+1,
          starttimeSecond:starttime,
          durationtimeSecond: duration,
          visibility : visibility,
          minRange : min_level,
          maxRange : max_level,
          creator : {handle : user.cfHandle,
            googleId : user.googleId},
          opponent : {
             handle:"",
             googleId : "undefined"
          },
          numberofProblems : no_of_problems,
          problems: [],
          rankList: []
       };

      await new Lockout(obj).save();
      await User.findOneAndUpdate({googleId:user.googleId},{$push:{"contestList" : {type:"lockout",contestId:size+1}}});
      if(visibility === "PRIVATE") 
      {

        let secret={
            "id":String(size+1),
            "type":"LOCKOUT"
         }

         const code=jwt.sign(secret,process.env.JWT_KEY,{
            expiresIn:'30d'
         });

         let url =process.env.origin + `/contest/private/register/`
         url += code;
         res.status(201).json({ contestError:'Contest created scroll down to see your contest details',info : `Your private Lockout # ${size+1} is created, share above link to whom you want to invite` , link : url });
      } 
      else 
      {
         res.status(201).json({ contestError:'Contest created scroll down to see your contest details',info : `Your  Lockout # ${size+1} is created , Enjoy the contest`});
      }
   }
};

// mashup register public
module.exports.mashup_register_public = async (req,res) => {

   let contest = req.params.contestId;
   let contestId = Number(contest);
   let user = req.user;
   
   // if user is not logged 
   if(user === undefined) 
   {
        let error = {
           error : 'You are not logged in'
        };
        res.render('error',{data:error,user:req.user});
   
   } 
   else if(!user.isHandle) 
   {
        let error = {
           error : 'Please verify your codeforces username in profile section'
        };
        res.render('error',{data:error,user:req.user});
   }  
   else 
   {
      
      let data = await Mashup.find({contestId: contestId});

      if(data.length > 0) 
      {
           let flag = 0;
           for(let i=0;i<data[0].registered.length;i++) 
           {
              if(data[0].registered[i].googleId == user.googleId) 
              {
                 flag = 1;
                 break;
              }
              
           }
           let obj ={
              handle:user.cfHandle,
              googleId:user.googleId
           };
           if(flag == 0 ) 
           {
              if(data[0].registered.length==10)
              {
                 let error = {
                    error : 'This mashup is full'
                 };
                 res.render('error',{data:error,user:req.user});
              }
              else 
              {
                 await Mashup.findOneAndUpdate({ contestId: contestId},{ $push: { "registered" : obj }});
                 await User.findOneAndUpdate({googleId:user.googleId},{$push:{"contestList" : {type:"mashup",contestId:contestId}}});
                 res.redirect('/contest/mashup');
              }
              
           } 
           else 
           {

              let error = {
                 error : 'You are already registered'
              };
              res.render('error',{data:error,user:req.user});
           }
     } 
     else 
     {
           let error = {
              error : 'Contest does not exist'
           };
           res.render('error',{data:error,user:req.user});
     }
  }
   
};

module.exports.lockout_register_public = async (req,res)=>{

   let contest = req.params.contestId;
   let contestId = Number(contest);
   let user = req.user;
   
  
   if(user === undefined) 
   {
      let error = {
         error : 'You are not logged in'
      };
      res.render('error',{data:error,user:req.user});

   } 
   else if(!user.isHandle) 
   {
      let error = {
        error : 'Please verify your codeforces username in profile section'
      };
      res.render('error',{data:error,user:req.user});
   }  
   else 
   {

      let obj = {
         handle:user.cfHandle,
         googleId:user.googleId
      };

      let data = await Lockout.find({contestId: contestId});
      if(data.length > 0) 
      {
           if((data[0].opponent.googleId == "undefined") && (data[0].creator.googleId != user.googleId)) 
           {
                 await Lockout.findOneAndUpdate({ contestId: contestId},{ $set: { "opponent" : obj }});
                 await User.findOneAndUpdate({googleId:user.googleId},{$push:{"contestList" : {type:"lockout",contestId:contestId}}});
                 res.redirect('/contest/lockout');
           } 
           else 
           {
                 if(data[0].creator.googleId == user.googleId)
                 {
                    let error = {
                         error : 'You are already registered'
                    };
                    res.render('error',{data:error,user:req.user});
                 }
                 else
                 {
                    let error = {
                       error : 'Lockout is full'
                    };
                    res.render('error',{data:error,user:req.user});
                 }
           }
     } 
     else 
     {
           let error = {
              error : 'Contest does not exist'
           };
           res.render('error',{data:error,user:req.user});
     }
  } 
};

module.exports.lockout_mashup_register_private = async(req,res) => {

  let user = req.user;
  
    if(user === undefined) 
    {
        let error = {
           error : 'You are not logged in'
        };
        res.render('error',{data:error,user:req.user});
    } 
    else if(!user.isHandle) 
    {
        let error = {
           error : 'Please verify your codeforces username in profile section',
        };
        res.render('error',{data:error,user:req.user});
    } 
    else 
    {
    
        let code = req.params.code;
        jwt.verify(code, process.env.JWT_KEY, async (e, decoded) => {
        if (e) {

           let error = {
              error : 'You can not register in this contest'
           };
           res.render('error',{data:error,user:req.user});
        } 
        else 
        {

           // extract contest by decoding 
           let contestId = Number(decoded.id);
           let type = String(decoded.type);

           if(type == "MASHUP") 
           {
                 let obj ={
                    handle:user.cfHandle,
                    googleId:user.googleId
                 };
              
                 let data1 = await Mashup.find({contestId: contestId});
                 
                 let data = data1[0];
                 
                 if(data.registered.length == 10) 
                 {
                    let error = {
                       error : 'you can not register mashup is full'
                    };
                    res.render('error',{data:error,user:req.user});
                 } 
                 else 
                 {
                    let flag = 0;
                    for(let i=0;i<data.registered.length;i++) 
                    {
                       if(data.registered[i].googleId == user.googleId) 
                       {
                          flag = 1;
                       }
                    }
                    if(flag == 0 )
                    {
                          await Mashup.findOneAndUpdate({ contestId: contestId},{ $push: { "registered" : obj }});
                          await User.findOneAndUpdate({googleId:user.googleId},{$push:{"contestList" : {type:"mashup",contestId:contestId}}});
                          res.redirect('/contest/mashup');

                    } 
                    else 
                    {
                          let error = {
                             error : 'You are already registered'
                          };
                          res.render('error',{data:error,user:req.user});
                    }
                 }
           }
           else 
           {
                 let obj = {
                    handle:user.cfHandle,
                    googleId:user.googleId
                 };

                 let data = await Lockout.find({contestId:contestId});
                 if((data[0].opponent.googleId == "undefined") && (data[0].creator.googleId != user.googleId)) 
                 {
                    await Lockout.findOneAndUpdate({ contestId: contestId},{ $set: { "opponent" : obj }});
                    await User.findOneAndUpdate({googleId:user.googleId},{$push:{"contestList" : {type:"lockout",contestId:contestId}}});
                    res.redirect('/contest/lockout');
                 } 
                 else 
                 {
                    if(data[0].creator.googleId == user.googleId)
                    {
                       let error = {
                          error : 'You are already registered'
                       };
                       res.render('error',{data:error,user:req.user});
                    }
                    else
                    {
                       let error = {
                          error : 'Lockout is full'
                       };
                       res.render('error',{data:error,user:req.user});
                    }
                 }
           }
        }
        });
    }
};

// mashup contest main page
module.exports.mashup_contest_landing_page_problems = async (req,res) => {

   let contest = req.params.contestId;
   let contestId = Number(contest);
   let data1 = await Mashup.find({contestId:contestId});
   let secondsSinceEpoch = Date.now();
   let user = req.user;

   if(data1.length == 0) 
   {
      let error = {
         error : 'Contest does not exist',
      };
      res.render('error',{data:error,user:req.user});
   } 
   else 
   {
      let data = data1[0];

      let starttime = data.starttimeSecond*1000;
      let duration = data.durationtimeSecond*1000;

      if(data.visibility == "PRIVATE") 
      {
         let flag = 0;
         if(user && user.isHandle) 
         {
            for(let i=0;i<data.registered.length;i++) 
            {
               if(data.registered[i].handle == user.cfHandle) 
               {
                  flag = 1 
                  break;
               }
            }
         }

         if(flag == 0) 
         {
               let error = {
                  error : 'You can not access this contest',
               };
               res.render('error',{data:error,user:req.user});
         } 
         else 
         {
               if(secondsSinceEpoch < starttime) 
               {
                  let error = {
                     error : 'CONTEST NOT STARTED',
                  };
                  res.render('mashupContest',{data:data,user:req.user,error:error,type:"PROBLEMS"});
               } 
               else if(secondsSinceEpoch - starttime <= duration + (86400*10*1000))
               {
                  res.render('mashupContest',{user:req.user,data:data,type:"PROBLEMS",error:1}); 
               }
               else 
               {
                  res.render('mashupContest',{user:req.user,data:data,type:"PROBLEMS",error:2}); 
               }
         }
      } 
      else 
      {
           
            if(secondsSinceEpoch < starttime) 
            {
               let error = {
                  error : 'CONTEST NOT STARTED',
               };
               res.render('mashupContest',{data:data,user:req.user,error:error,type:"PROBLEMS"});
            } 
            else if(secondsSinceEpoch - starttime <= duration + (86400*10*1000))
            {
               res.render('mashupContest',{user:req.user,data:data,type:"PROBLEMS",error:1}); 
            }
            else 
            {
               res.render('mashupContest',{user:req.user,data:data,type:"PROBLEMS",error:2}); 
            }
      }
   }
};

// mashup standing page 
module.exports.mashup_contest_landing_page_standing = async (req,res) => {

   let contest = req.params.contestId;
   let contestId = Number(contest);
   let data1 = await Mashup.find({contestId:contestId});
   let user = req.user;
   let secondsSinceEpoch = Date.now();

   if(data1.length == 0) 
   {
      let error = {
         error : 'Contest does not exist',
      };
      res.render('error',{data:error,user:req.user});
   } 
   else 
   {
      let data = data1[0];
      let starttime = data.starttimeSecond*1000;
      let duration = data.durationtimeSecond*1000;

      if(data.visibility == "PRIVATE") 
      {
         let flag = 0;
         if(user && user.isHandle) 
         {
            for(let i=0;i<data.registered.length;i++) 
            {
               if(data.registered[i].handle == user.cfHandle) 
               {
                  flag = 1 
                  break;
               }
            }
         }

         if(flag == 0) 
         {
               let error = {
                  error : 'You can not access this contest'
               };
               res.render('error',{data:error,user:req.user});
         } 
         else 
         {
               if(secondsSinceEpoch < starttime) 
               {
                  let error = {
                     error : 'CONTEST NOT STARTED'
                  };
                  res.render('mashupContest',{data:data,user:req.user,error:error,type:"STANDING"});
               } 
               else if(secondsSinceEpoch - starttime <= duration + (86400*10*1000))
               {
                  res.render('mashupContest',{user:req.user,data:data,type:"STANDING",error:1}); 
               }
               else 
               {
                  res.render('mashupContest',{user:req.user,data:data,type:"STANDING",error:2}); 
               }
         }
      } 
      else 
      {
            if(secondsSinceEpoch < starttime) 
            {
               let error = {
                  error : 'CONTEST NOT STARTED'
               };
               res.render('mashupContest',{data:data,user:req.user,error:error,type:"STANDING"});
            } 
            else if(secondsSinceEpoch - starttime <= duration + (86400*10*1000))
            {
               res.render('mashupContest',{user:req.user,data:data,type:"STANDING",error:1}); 
            }
            else 
            {
               res.render('mashupContest',{user:req.user,data:data,type:"STANDING",error:2}); 
            }
      }
   }

};

// mashup registered users list
module.exports.mashup_registered_users = async (req,res) => {

   let contest = req.params.contestId;
   let contestId = Number(contest);
   let data = await Mashup.find({contestId:contestId});

   if(data.length==0) 
   {
        let error = {
           error : 'This contest does not exist'
        };
        res.render('error',{data:error,user:req.user});
   } 
   else 
   {
       res.render('mashupContest',{user:req.user,data:data[0],type:"REGISTERED"});
   }
};

// sending data to browser api
module.exports.get_registered_list = async(req,res) => {
   let contest = req.params.contestId;
   let contestId = Number(contest);
   let data1 = await Mashup.find({contestId:contestId});
   res.send(data1);
}

// saving mashup problems api
module.exports.save_mashup_problems = async (req,res) => {
  const {problem,contestId} = req.body;
  await Mashup.findOneAndUpdate({contestId:contestId},{$set:{"problems":problem}});
  res.send("saved");
};

// saving mashup snap
module.exports.save_mashup_ranklist = async (req,res) => {
   const {rankList,contestId} = req.body;
   await Mashup.findOneAndUpdate({contestId:contestId},{$set:{"rankList":rankList}});
   res.send("saved");
};
 
// lockout landing page or main page
module.exports.lockout_contest_landing_page = async (req,res) => {

   let contest = req.params.contestId;
   let contestId = Number(contest);
   let data1 = await Lockout.find({contestId:contestId});
   let user = req.user;
   let secondsSinceEpoch = Date.now();
   if(data1.length == 0) 
   {
      let error = {
         error : 'Contest does not exist',
      };
      res.render('error',{data:error,user:req.user});
   } 
   else 
   {
      let data = data1[0];
      let starttime = data.starttimeSecond*1000;
      let duration = data.durationtimeSecond*1000;

      if(data.visibility == "PRIVATE") 
      {
         let flag = 0;
         
         if(user && user.isHandle)
         {
            if((data.creator.handle == user.cfHandle))
            {
               flag = 1;
            }
            if((data.opponent.googleId != "undefined") && data.opponent.handle==user.cfHandle)
            {
               flag = 1;
            }
         }
         
         if(flag == 0) 
         {
               let error = {
                  error : 'You can not access this contest'
               };
               res.render('error',{data:error,user:req.user});
         } 
         else 
         {
               if(secondsSinceEpoch < starttime) 
               {
                  let error = {
                     error : 'CONTEST NOT STARTED'
                  };
                  res.render('lockoutContest',{data:data,user:req.user,error:error});
               } 
               else if(secondsSinceEpoch - starttime <= duration + (86400*10*1000))
               {
                  res.render('lockoutContest',{user:req.user,data:data,error:1}); 
               }
               else 
               {
                  res.render('lockoutContest',{user:req.user,data:data,error:2}); 
               }
         }
      } 
      else 
      {
           
            if(secondsSinceEpoch < starttime) 
            {
               let error = {
                  error : 'CONTEST NOT STARTED'
               };
               res.render('lockoutContest',{data:data,user:req.user,error:error});
            } 
            else if(secondsSinceEpoch - starttime <= duration + (86400*10*1000))
            {
               res.render('lockoutContest',{user:req.user,data:data,error:1}); 
            }
            else 
            {
               res.render('lockoutContest',{user:req.user,data:data,error:2}); 
            }
      }
   }
};

// sending lockout info to browser api
module.exports.get_lockout = async(req,res) => {
   let contest = req.params.contestId;
   let contestId = Number(contest);
   let data1 = await Lockout.find({contestId:contestId});
   res.send(data1);
}

// saving lockout snap in database
module.exports.save_lockout = async (req,res) => {
   const {problem,rankList,contestId} = req.body;
   await Lockout.findOneAndUpdate({contestId:contestId},{$set:{"problems":problem, "rankList":rankList}});
   res.send("saved");
}





