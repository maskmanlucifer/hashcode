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

   if(data.status != "OK") {
      res.redirect('/error');
   } else {
      let contestID = data.result.contest.id;
      let contestName = data.result.contest.name;
      let tempName = "";
      for(let i=0;i<contestName.length;i++) {
         if(contestName[i]=='(') {
            break;
         } else {
            tempName += contestName[i];
         }
      }
      contestName = tempName;
      let problems = [];
      for(let i=0;i<data.result.problems.length;i++) {
         problems.push(data.result.problems[i].index);
      }

      res.render('contestVisualizer',{user:req.user,contestName:contestName,contestID:contestID,problems:problems});
   }
});

module.exports = router;