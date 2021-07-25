const fetch = require("node-fetch");


// getting landing page of visualizer form
module.exports.visualizer_main_page_get = (req,res) => {
    res.render('visualizer',{user:req.user}); 
};

// getting contest page which is going to be visualized
module.exports.visualizer_contest_page = async (req,res)=>{

    let contestNo = Number(req.params.contestno);

    let uri=`https://codeforces.com/api/contest.ratingChanges?contestId=${contestNo}`;
    let response =  await fetch(uri);
    let data = await response.json();

    let error = {
       error : 'Can not show this contest'
    };

    if(data.status != "OK" || data.result.length==0) 
    {
       res.render('error',{data:error,user:req.user});
    } 
    else 
    {
       uri = "https://codeforces.com/api/contest.standings?contestId=" + contestNo + "&from=1&count=1";
       response =  await fetch(uri);
       data = await response.json();

       let contestID = data.result.contest.id;
       let contestName = data.result.contest.name;
       let tempName = "";

       for(let i=0;i<contestName.length;i++) 
       {
          if(contestName[i]=='(') 
          {
             break;
          } 
          else 
          {
             tempName += contestName[i];
          }
       }
       contestName = tempName;
       let problems = [];
       for(let i=0;i<data.result.problems.length;i++) 
       {
          problems.push(data.result.problems[i].index);
       }
 
       res.render('contestVisualizer',{user:req.user,contestName:contestName,contestID:contestID,problems:problems});
    }
};