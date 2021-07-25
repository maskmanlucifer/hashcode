let starttime = document.getElementById('starttime').textContent;
let duration = document.getElementById('duration').textContent;
let problems = document.getElementById('problems').textContent;
let contestId = document.getElementById('contestId').textContent;
let minRange = Number(document.getElementById('minRange').textContent);
let maxRange = Number(document.getElementById('maxRange').textContent);
let noofProblems = Number(document.getElementById('noofProblems').textContent);

let secondsSinceEpoch = Date.now();

starttime = Number(starttime)*1000;
duration = Number(duration)*1000;

if(secondsSinceEpoch - starttime <= duration + (86400*10*1000)) 
{
         if(problems == 0)
         {
              let exclusedProblems = {};
              async function extractProblemList()
              {
                let url = "/api/lockout/";
                url += contestId;
                let data1 = await fetch(url);
                data = await data1.json();
                data = data[0];
                let registered = [];
                registered.push(data.creator.handle);
                if(data.opponent.googleId!="undefined")
                {
                    registered.push(data.opponent.handle);
                }
                let noofRegistered = registered.length;
                for(let i=0;i<Math.min(5,noofRegistered);i++) 
                {
                    let uri = "https://codeforces.com/api/user.status?handle=";

                    uri += registered[i];

                    let data2 = await fetch(uri);
                    data1 = await data2.json();

                    for(let j=0;j<data1.result.length;j++)
                    {
                        if(data1.result[j].verdict == "OK") 
                        { 
                           let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                           if(exclusedProblems[id]==undefined)
                           {
                              exclusedProblems[id]=1;
                           }
                        }
                    }
                }

                let ratingofProblems = {};
                let required = [];

                let maRange = Math.floor(maxRange/100);
                let miRange = Math.floor(minRange/100);
                let diff = maRange - miRange +1;

                maRange-=8;
                miRange-=8;

                let z1 = Math.floor(noofProblems / diff);
                let z2 = noofProblems % diff;

                for(let j=miRange;j<=maRange;j++)
                {
                  required[j]=z1;
                  if(z2>0)
                  {
                    required[j]+=1;
                    z2--;
                  }
                }
                
                url = "https://codeforces.com/api/problemset.problems";
                data1 = await fetch(url);
                data = await data1.json();
                
                for(let i=0;i<data.result.problems.length;i++) 
                {
                  let id = data.result.problems[i].contestId + data.result.problems[i].index;
                  if(exclusedProblems[id]==undefined)
                  {
                    ratingofProblems[id]=data.result.problems[i].rating;
                  }
                }
                let vect = [];
                for(let i=0;i<data.result.problemStatistics.length;i++)
                {
                  let id = data.result.problemStatistics[i].contestId + data.result.problemStatistics[i].index;
                  if(ratingofProblems[id]!=undefined) 
                  {
                    vect.push({contestId:data.result.problemStatistics[i].contestId,index:data.result.problemStatistics[i].index,points:ratingofProblems[id],count:data.result.problemStatistics[i].solvedCount});
                  }
                }
                vect.sort((p1,p2)=>{
                  if(p1.points==p2.points) 
                  {
                        if(p1.count<p2.count)
                        {
                            return 1;
                        }
                        else if(p1.count>p2.count)
                        {
                            return -1;
                        }
                        else
                        {
                             return 0;
                        }
                  }
                  else
                  {
                    if(p1.points<p2.points)
                    {
                        return -1;
                    }
                    else
                    {
                         return 1;
                    }
                  }
                });

                let problem = [];
                for(let i=0;i<vect.length;i++) 
                {
                   let r1 = vect[i].points;
                   r1 = Math.floor(r1/100); 
                   r1-=8;
                   if(required[r1]>0)
                   {
                     problem.push({contestId:vect[i].contestId,index:vect[i].index,points:vect[i].points,acFirst:"-"});
                     required[r1]--;
                   }
                }

                let table = document.getElementById('myTable1');
                
                let c = ['A','B','C','D','E','F','G','H','I','J'];
                let row = table.insertRow(0);
                let cell1 =row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                cell1.innerHTML = `#`;
                cell2.innerHTML = `NAME`;
                cell3.innerHTML = `POINTS`;
                cell4.innerHTML = `FIRST SOLVED BY`;

                for(let i=0;i<problem.length;i++)
                {
                    let row = table.insertRow(i+1);
                    let cell1 =row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    let cell4 = row.insertCell(3);

                    let p1=i+1;
                    let p2=problem[i].contestId;
                    let p3=problem[i].index;
                    let p4=c[i];
                    let p5=problem[i].points;
                    
                    cell1.innerHTML = `${p1}`;
                    cell2.innerHTML = `<a href="https://codeforces.com/contest/${p2}/problem/${p3}">PROBLEM-${p4}</a>`;
                    cell3.innerHTML = `${p5}`;
                    cell4.innerHTML = `-`;
                }
                
                let table1 = document.getElementById('myTable2');

                let rankList = [];
                for(let i=0;i<registered.length;i++)
                {
                    let obj = {
                        handle:registered[i],
                        points:0,
                        problemResults:[]
                    };
                    for(let j=0;j<problem.length;j++)
                    {
                        obj.problemResults.push({contestId:-1,submissionId:-1});
                    }
                    rankList.push(obj);
                }

                let row1 = table1.insertRow(0);
                let cll1 =row1.insertCell(0);
                cll1.innerHTML = `#`;
                let cll2 = row1.insertCell(1);
                cll2.innerHTML = `USERNAME`;
                let cll3 = row1.insertCell(2);
                cll3.innerHTML = `POINTS`;
                for(let i=0;i<problem.length;i++)
                {
                    let cll = row1.insertCell(3+i);
                    cll.innerHTML = `${c[i]}`;
                }

                for(let i=0;i<rankList.length;i++)
                {
                    let row = table1.insertRow(i+1);
                    let cell1 =row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    

                    let p1=i+1;
                    cell1.innerHTML = `${p1}`;
                    cell2.innerHTML = `<a href="https://codeforces.com/profile/${rankList[i].handle}">${rankList[i].handle}</a>`;
                    cell3.innerHTML = `${rankList[i].points}`;

                    for(let j=0;j<rankList[i].problemResults.length;j++)
                    {
                        let cell = row.insertCell(3+j);

                        if(rankList[i].problemResults[j].contestId!=-1)
                        {
                            cell.innerHTML = `<a href="https://codeforces.com/contest/${rankList[i].problemResults[j].contestId}/submission/${rankList[i].problemResults[j].submissionId}">AC</a>`;
                        }
                        else
                        {
                            cell.innerHTML = `-`;
                        }
                        
                    }
                }

                const res = await fetch('/save/lockout', { 
                  method: 'POST', 
                  body: JSON.stringify({problem,contestId,rankList}),
                  headers: {'Content-Type': 'application/json'}
                });
              
                const data5 = await res.json();
              }
              
              extractProblemList();
         }
         else
         {
             
              async function extractProblemRankList()
              {
                let url = "/api/lockout/";
                url += contestId;
                
                let data1 = await fetch(url);
                data = await data1.json();
                data = data[0];
                let registered = [];

                registered.push(data.creator.handle);

                if(data.opponent.googleId!="undefined")
                {
                    registered.push(data.opponent.handle);
                }

                let noofRegistered = registered.length;

                let solveTime1 = {}, submissionId1 = {};
                let solveTime2 = {}, submissionId2 = {};

                for(let i=0;i<1;i++) 
                {
                    
                    let uri = "https://codeforces.com/api/user.status?handle=";

                    uri += registered[i];
                    uri += "&from=1&count=400";

                    let data2 = await fetch(uri);
                    data1 = await data2.json();
                    
                    for(let j=0;j<data1.result.length;j++)
                    {
                        if((data1.result[j].verdict == "OK") &&  (data1.result[j].creationTimeSeconds*1000>=starttime) && (data1.result[j].creationTimeSeconds*1000<=starttime + duration)) 
                        { 
                            let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                            if(solveTime1[id]==undefined)
                            {
                                solveTime1[id]=data1.result[j].creationTimeSeconds;
                                submissionId1[id]=data1.result[j].id;
                            }
                            else 
                            {
                                solveTime1[id]=data1.result[j].creationTimeSeconds;
                                submissionId1[id]=data1.result[j].id;
                            }
                        }
                    }
                }

                if(noofRegistered>1)
                {
                    let uri = "https://codeforces.com/api/user.status?handle=";

                    uri += registered[1];
                    url += "&from=1&count=400";

                    let data2 = await fetch(uri);
                    data1 = await data2.json();
                    
                    for(let j=0;j<data1.result.length;j++)
                    {
                        if((data1.result[j].verdict == "OK") &&  (data1.result[j].creationTimeSeconds*1000>=starttime) && (data1.result[j].creationTimeSeconds*1000<=starttime + duration)) 
                        { 
                            let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                            if(solveTime2[id]==undefined)
                            {
                                solveTime2[id]=data1.result[j].creationTimeSeconds;
                                submissionId2[id]=data1.result[j].id;
                            }
                            else 
                            {
                                solveTime2[id]=data1.result[j].creationTimeSeconds;
                                submissionId2[id]=data1.result[j].id;
                            }
                        }
                    }
                }


                let problem = [], rankList = [];
                
                for(let i=0;i<data.problems.length;i++)
                {
                    let id = data.problems[i].contestId + data.problems[i].index;
                    if(solveTime1[id]!=undefined)
                    {
                        if(solveTime2[id]!=undefined)
                        {
                            if(solveTime2[id]>solveTime1[id])
                            {
                                problem.push({contestId:data.problems[i].contestId,index:data.problems[i].index,points:data.problems[i].points,acFirst:registered[0]});
                            }
                            else 
                            {
                                problem.push({contestId:data.problems[i].contestId,index:data.problems[i].index,points:data.problems[i].points,acFirst:registered[1]});
                            }
                        }
                        else 
                        {
                            problem.push({contestId:data.problems[i].contestId,index:data.problems[i].index,points:data.problems[i].points,acFirst:registered[0]});
                        }
                    }
                    else
                    {
                        if(solveTime2[id]!=undefined)
                        {
                            problem.push({contestId:data.problems[i].contestId,index:data.problems[i].index,points:data.problems[i].points,acFirst:registered[1]});
                        }
                        else 
                        {
                            problem.push({contestId:data.problems[i].contestId,index:data.problems[i].index,points:data.problems[i].points,acFirst:"-"});
                        }
                    }
                }
                
                if(registered.length>1)
                {
                    console.log("YES");
                    let obj1 = {
                        handle:registered[0],
                        points:0,
                        problemResults:[]
                    };
                    let obj2 = {
                        handle:registered[1],
                        points:0,
                        problemResults:[]
                    };
                    for(let i=0;i<data.problems.length;i++)
                    {
                        let id = data.problems[i].contestId + data.problems[i].index;
                        if(solveTime1[id]!=undefined)
                        {
                            if(solveTime2[id]!=undefined)
                            {
                                if(solveTime2[id]>solveTime1[id])
                                {
                                    obj1.points+= data.problems[i].points;
                                    obj1.problemResults.push({contestId:data.problems[i].contestId,submissionId:submissionId1[id]});
                                    obj2.problemResults.push({contestId:-1,submissionId:-1});
                                }
                                else 
                                {
                                    obj2.points+= data.problemss[i].points;
                                    obj2.problemResults.push({contestId:data.problems[i].contestId,submissionId:submissionId1[id]});
                                    obj1.problemResults.push({contestId:-1,submissionId:-1});
                                }
                            }
                            else 
                            {
                                    obj1.points+= data.problems[i].points;
                                    obj1.problemResults.push({contestId:data.problem[i].contestId,submissionId:submissionId1[id]});
                                    obj2.problemResults.push({contestId:-1,submissionId:-1});
                            }
                        }
                        else
                        {
                            if(solveTime2[id]!=undefined)
                            {
                                    obj2.points+= data.problems[i].points;
                                    obj2.problemResults.push({contestId:data.problem[i].contestId,submissionId:submissionId1[id]});
                                    obj1.problemResults.push({contestId:-1,submissionId:-1});
                            }
                            else 
                            {
                                   obj1.problemResults.push({contestId:-1,submissionId:-1});
                                   obj2.problemResults.push({contestId:-1,submissionId:-1});
                            }
                        }
                    }
                    rankList.push(obj1);
                    rankList.push(obj2);

                }
                else 
                {
                   
                    let obj1 = {
                        handle:registered[0],
                        points:0,
                        problemResults:[]
                    };

                    for(let i=0;i<data.problems.length;i++)
                    {
                        let id = data.problems[i].contestId + data.problems[i].index;
                        if(solveTime1[id]!=undefined)
                        {
                            obj1.points+= data.problems[i].points;
                            obj1.problemResults.push({contestId:data.problems[i].contestId,submissionId:submissionId1[id]});
                        }
                        else 
                        {
                            obj1.problemResults.push({contestId:-1,submissionId:-1});
                        }
                    }
                    console.log(rankList);
                    rankList.push(obj1);
                    console.log(rankList);
                }
                console.log(rankList);
                let table = document.getElementById('myTable1');
                
                let c = ['A','B','C','D','E','F','G','H','I','J'];
                let row = table.insertRow(0);
                let cell1 =row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                cell1.innerHTML = `#`;
                cell2.innerHTML = `NAME`;
                cell3.innerHTML = `POINTS`;
                cell4.innerHTML = `FIRST SOLVED BY`;

                for(let i=0;i<problem.length;i++)
                {
                    let row = table.insertRow(i+1);
                    let cell1 =row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    let cell4 = row.insertCell(3);

                    let p1=i+1;
                    let p2=problem[i].contestId;
                    let p3=problem[i].index;
                    let p4=c[i];
                    let p5=problem[i].points;
                    
                    cell1.innerHTML = `${p1}`;
                    cell2.innerHTML = `<a href="https://codeforces.com/contest/${p2}/problem/${p3}">PROBLEM-${p4}</a>`;
                    cell3.innerHTML = `${p5}`;
                    cell4.innerHTML = `-`;
                }
                
                let table1 = document.getElementById('myTable2');


                let row1 = table1.insertRow(0);
                let cll1 =row1.insertCell(0);
                cll1.innerHTML = `#`;
                let cll2 = row1.insertCell(1);
                cll2.innerHTML = `USERNAME`;
                let cll3 = row1.insertCell(2);
                cll3.innerHTML = `POINTS`;
                for(let i=0;i<problem.length;i++)
                {
                    let cll = row1.insertCell(3+i);
                    cll.innerHTML = `${c[i]}`;
                }

                for(let i=0;i<rankList.length;i++)
                {
                    let row = table1.insertRow(i+1);
                    let cell1 =row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    

                    let p1=i+1;
                    cell1.innerHTML = `${p1}`;
                    cell2.innerHTML = `<a href="https://codeforces.com/profile/${rankList[i].handle}">${rankList[i].handle}</a>`;
                    cell3.innerHTML = `${rankList[i].points}`;

                    for(let j=0;j<rankList[i].problemResults.length;j++)
                    {
                        let cell = row.insertCell(3+j);

                        if(rankList[i].problemResults[j].contestId!=-1)
                        {
                            cell.innerHTML = `<a href="https://codeforces.com/contest/${rankList[i].problemResults[j].contestId}/submission/${rankList[i].problemResults[j].submissionId}">AC</a>`;
                        }
                        else
                        {
                            cell.innerHTML = `-`;
                        }
                        
                    }
                }

                const res = await fetch('/save/lockout', { 
                  method: 'POST', 
                  body: JSON.stringify({problem,contestId,rankList}),
                  headers: {'Content-Type': 'application/json'}
                });
              
                const data5 = await res.json();
              }
              
              extractProblemRankList();
         }
         
}

if(secondsSinceEpoch<starttime) 
{
    var countDownDate = starttime;
    var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("demo1").textContent = "CONTEST WILL START IN";
    
    let finaltime;
    if(days) 
    {
      finaltime = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    } 
    else if(hours) 
    {
      finaltime= hours + "h " + minutes + "m " + seconds + "s ";
    } 
    else if(minutes) 
    {
      finaltime =  minutes + "m " + seconds + "s ";
    } 
    else 
    {
      finaltime = seconds + "s ";
    }
    document.getElementById("demo").innerHTML = finaltime;

    if (distance < 0) 
    {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "CONTEST STARTED";
    }
  }, 1000);

} 
else if(secondsSinceEpoch<=starttime+duration) 
{
  var countDownDate = starttime+ duration;
  var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("demo1").textContent = "CONTEST WILL END IN";
  
  let finaltime;
  if(days) 
  {
    finaltime = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  } 
  else if(hours)
  {
    finaltime= hours + "h "  + minutes + "m " + seconds + "s ";
  } 
  else if(minutes) 
  {
    finaltime =  minutes + "m " + seconds + "s ";
  } 
  else 
  {
    finaltime = seconds + "s ";
  }
  document.getElementById("demo").innerHTML = finaltime;

  if (distance < 0) 
  {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "CONTEST ENDED";
  }

}, 1000);

} 
else  
{
    document.getElementById("demo1").textContent = "CONTEST IS FINISHED";
}


