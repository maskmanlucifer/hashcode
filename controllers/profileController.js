const User = require('../models/userModel');
const fetch = require('node-fetch');
module.exports.profile_get = (req,res) => {
    res.render('profile',{user:req.user}); 
 };

 module.exports.verify = async (req,res)=>{
   let cfHandle = req.body.cfHandle;
   let url = "https://codeforces.com/api/user.info?handles=";
   url += cfHandle;
   let data = await fetch(url);
   let data1 = await data.json();
   if(data1.status != "OK") 
   {
       res.send({contestError:'Invalid Handle',info:undefined});
   } else {
       let googleId = req.user.googleId;
       await User.findOneAndUpdate({googleId:googleId},{$set: { "cfHandle" : cfHandle }});
       res.send({contestError:undefined,info:1});
   }
 };

 module.exports.change_isHandle = async (req,res)=>{
    let googleId = req.user.googleId;
    let cfHandle = req.body.cfHandle;
    let user = await User.find({googleId:googleId});
    let url = `https://codeforces.com/api/user.status?handle=${cfHandle}&from=1&count=1`;
    let data = await fetch(url);
    console.log(url);
    let data1 = await data.json();
    if(data1.status != "OK") 
    {
        res.send({contestError:'Handle not verified',info:undefined});
    } else {
        let flag = 0 ;
        console.log(data1);
        console.log(data1.result.length);
        for(let i=0;i<data1.result.length;i++)
        {
            if(data1.result[i].problem.contestId==1331 && data1.result[i].problem.index=='A')
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