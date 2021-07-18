const router = require('express').Router();
const fetch = require("node-fetch");

router.get('/visualizer',(req,res)=>{
   res.render('visualizer',{user:req.user}); 
});


router.get('/visualizer/contest/:contestno',async (req,res)=>{
   let contestNo = Number(req.params.contestno);
   let uri = "https://codeforces.com/api/contest.standings?contestId=" + contestNo + "&from=1&count=1";
   let response =  await fetch(uri);
   let data = await response.json();
   let contestID = data.result.contest.id;
   let contestName = data.result.contest.name;
   let problems = [];
   for(let i=0;i<data.result.problems.length;i++) {
      problems.push(data.result.problems[i].index);
   }
   res.render('contestv',{user:req.user,contestName:contestName,contestID:contestID,problems:problems});
});

module.exports = router;