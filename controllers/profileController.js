const User = require('../models/userModel');
const fetch = require('node-fetch');
module.exports.profile_get = (req,res) => {
    res.render('profile',{user:req.user}); 
 }; 

 module.exports.handle_save = async (req,res)=> {

   let cfHandle = req.body.cfHandle;
   let url = "https://codeforces.com/api/user.info?handles=";

   url += cfHandle;

   let data = await fetch(url);
   let data1 = await data.json();

   if(data1.status != "OK") 
   {
       res.send({contestError:'Invalid Handle',info:undefined});
   } 
   else 
   {
       let googleId = req.user.googleId;
       await User.findOneAndUpdate({googleId:googleId},{$set: { "cfHandle" : cfHandle }});
       res.send({contestError:undefined,info:1});

   }
 };

 module.exports.change_isHandle = async (req,res)=>{

    let googleId = req.user.googleId;
    let cfHandle = req.body.cfHandle;

    let user = await User.find({googleId:googleId});

    let url = `https://codeforces.com/api/user.status?handle=${cfHandle}&from=1&count=10`;
    let data = await fetch(url);
    
    let data1 = await data.json();
    if(data1.status != "OK") 
    {
        res.send({contestError:'Handle not verified',info:undefined});
    } 
    else 
    {
        let secondsSinceEpoch = Date.now();
        
        let flag = 0 ;
        for(let i=0;i<data1.result.length;i++)
        {
            let submissionTime = data1.result[i].creationTimeSeconds * 1000;
            let diff = secondsSinceEpoch - submissionTime;
            if(data1.result[i].problem.contestId==1331 && data1.result[i].problem.index=='A' && (diff<=70000))
            {
                flag=1;
            }
        }
        if(flag==0)
        {
            res.send({contestError:'Handle not verified',info:undefined});
        }
        else
        {
            await User.findOneAndUpdate({googleId:googleId},{$set: { "isHandle" : true }});
            res.send({contestError:undefined,info:1});
        }  
    }
  };