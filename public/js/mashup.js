// extarcting all ejs data from frontend
let starttime = document.getElementById('starttime').textContent;
let duration = document.getElementById('duration').textContent;
let problems = document.getElementById('problems').textContent;
let type = document.getElementById('type').textContent;
let contestId = document.getElementById('contestId').textContent;
let minRange = Number(document.getElementById('minRange').textContent);
let maxRange = Number(document.getElementById('maxRange').textContent);
let noofProblems = Number(document.getElementById('noofProblems').textContent);


let secondsSinceEpoch = Date.now();
starttime = Number(starttime)*1000;
duration = Number(duration)*1000;

if(secondsSinceEpoch - starttime <= duration + (86400*10*1000)) 
{
  function delay(n) 
  {
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
  }
    if(type == "PROBLEMS") 
    {
         // for creating awaits 
         if(problems == 0)
         {
              let exclusedProblems = {};

              async function extractProblemList()
              {
                let url = "/api/registered/";
                url += contestId;
                let data1 = await fetch(url);
                data = await data1.json();
                data = data[0];

                let noofRegistered = data.registered.length;
                for(let i=0;i<Math.min(5,noofRegistered);i++) 
                {
                    let uri = "https://codeforces.com/api/user.status?handle=";
                    uri += data.registered[i].handle;
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

                if(noofRegistered>5)
                {
                  await delay(1);
                  for(let i=5;i<Math.min(10,noofRegistered);i++) 
                  {
                      let uri = "https://codeforces.com/api/user.status?handle=";
                      uri += data.registered[i].handle;
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
                
                // sorting problems on the basis of rating and number of submissions
                vect.sort((p1,p2)=> {
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

                // picking problems from the list 
                let problem = [];
                for(let i=0;i<vect.length;i++) 
                {
                   let r1 = vect[i].points;
                   r1 = Math.floor(r1/100); 
                   r1-=8;
                   if(required[r1]>0)
                   {
                     problem.push({contestId:vect[i].contestId,index:vect[i].index,numberofAc:0,points:vect[i].points});
                     required[r1]--;
                   }
                }


                let table = document.getElementById('myTable');
                let c = ['A','B','C','D','E','F','G','H','I','J'];
                let row = table.insertRow(0);
                let cell1 =row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                cell1.innerHTML = `#`;
                cell2.innerHTML = `NAME`;
                cell3.innerHTML = `POINTS`;
                cell4.innerHTML = `NUMBER OF AC`;

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
                    cell2.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://codeforces.com/contest/${p2}/problem/${p3}">PROBLEM-${p4}</a>`;
                    cell3.innerHTML = `${p5}`;
                    cell4.innerHTML = `${0}`;
                }
                
                const res = await fetch('/save/mashup/problems', { 
                  method: 'POST', 
                  body: JSON.stringify({problem,contestId}),
                  headers: {'Content-Type': 'application/json'}
                });
              
                const data5 = await res.json();
              }
              
              extractProblemList();
         }
         else
         {
             
              async function extractProblemList()
              {
                let url = "/api/registered/";
                url += contestId;

                let data1 = await fetch(url);
                data = await data1.json();
                data = data[0];

                let noofRegistered = data.registered.length;
                for(let i=0;i<data.problems.length;i++)
                {
                  data.problems[i].numberofAc = 0;
                }
                for(let i=0;i<Math.min(5,noofRegistered);i++) 
                {
                    let uri = "https://codeforces.com/api/user.status?handle=";
                    uri += data.registered[i].handle;
                    uri+= "&from=1&count=400";

                    let data2 = await fetch(uri);
                    data1 = await data2.json();

                    let solved = {};
                    for(let j=0;j<data1.result.length;j++)
                    {
                        if((data1.result[j].verdict == "OK") &&  (data1.result[j].creationTimeSeconds*1000>=starttime) && (data1.result[j].creationTimeSeconds*1000<=starttime + duration)) 
                        { 
                           let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                           if(solved[id]==undefined)
                           {
                              solved[id]=1;
                           }
                        }
                    }

                    for(let j=0;j<data.problems.length;j++)
                    {
                       let id = data.problems[j].contestId + data.problems[j].index;
                       if(solved[id]!=undefined)
                       {
                         data.problems[j].numberofAc++;
                       }
                    }
                }
                if(noofRegistered>5)
                {
                  await delay(1);
                  for(let i=5;i<Math.min(10,noofRegistered);i++) 
                  {
                      let uri = "https://codeforces.com/api/user.status?handle=";
                      uri += data.registered[i].handle;
                      uri+= "&from=1&count=400";

                      let data2 = await fetch(uri);
                      data1 = await data2.json();

                      let solved = {};
                      for(let j=0;j<data1.result.length;j++)
                      {
                          if((data1.result[j].verdict == "OK") &&  (data1.result[j].creationTimeSeconds*1000>=starttime) && (data1.result[j].creationTimeSeconds*1000<=starttime + duration)) 
                          { 
                            let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                            if(solved[id]==undefined)
                            {
                                solved[id]=1;
                            }
                          }
                      }
                      
                      for(let j=0;j<data.problems.length;j++)
                      {
                        let id = data.problems[j].contestId + data.problems[j].index;
                        if(solved[id]!=undefined)
                        {
                          data.problems[j].numberofAc++;
                        }
                      }
                  }
                }
                
                let table = document.getElementById('myTable');
                
                let c = ['A','B','C','D','E','F','G','H','I','J'];
                let row = table.insertRow(0);
                let cell1 =row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                cell1.innerHTML = `#`;
                cell2.innerHTML = `NAME`;
                cell3.innerHTML = `POINTS`;
                cell4.innerHTML = `NUMBER OF AC`;

                for(let i=0;i<data.problems.length;i++)
                {
                    let row = table.insertRow(i+1);
                    let cell1 =row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    let cell4 = row.insertCell(3);

                    let p1=i+1;
                    let p2=data.problems[i].contestId;
                    let p3=data.problems[i].index;
                    let p4=c[i];
                    let p5=data.problems[i].points;
                    let p6=data.problems[i].numberofAc;

                    cell1.innerHTML = `${p1}`;
                    cell2.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://codeforces.com/contest/${p2}/problem/${p3}">PROBLEM-${p4}</a>`;
                    cell3.innerHTML = `${p5}`;
                    cell4.innerHTML = `${p6}`;
                }

                let problem = data.problems;
                const res = await fetch('/save/mashup/problems', { 
                  method: 'POST', 
                  body: JSON.stringify({problem,contestId}),
                  headers: {'Content-Type': 'application/json'}
                });
              
                const data5 = await res.json();
                
              }
              extractProblemList();
         }
    }
    else if(type == "STANDING")
    {
         async function extractRankList()
         {
            let rankList = [];

            let url = "/api/registered/";
            url += contestId;

            let data1 = await fetch(url);
            data = await data1.json();
            data = data[0];

            let noofRegistered = data.registered.length;
    
            for(let i=0;i<Math.min(5,noofRegistered);i++) 
            {
                let uri = "https://codeforces.com/api/user.status?handle=";
                uri += data.registered[i].handle;
                uri+= "&from=1&count=400";

                let data2 = await fetch(uri);
                data1 = await data2.json();

                let solvedTime = {},submissionId = {};

                for(let j=0;j<data1.result.length;j++)
                {
                    if((data1.result[j].verdict == "OK") &&  (data1.result[j].creationTimeSeconds*1000>=starttime) && (data1.result[j].creationTimeSeconds*1000<=starttime + duration)) 
                    { 
                        let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                        if(solvedTime[id]==undefined)
                        {
                          solvedTime[id]=data1.result[j].creationTimeSeconds;
                          submissionId[id]=data1.result[j].id;
                        }
                        else 
                        {
                          solvedTime[id]=data1.result[j].creationTimeSeconds;
                          submissionId[id]=data1.result[j].id;
                        }
                    }
                }
                let obj = {
                  handle : data.registered[i].handle,
                  points : 0,
                  problemResults : []
                };

                for(let j=0;j<data.problems.length;j++)
                {
                  let id = data.problems[j].contestId + data.problems[j].index;
                  if(solvedTime[id]!=undefined)
                  {
                     let initial = Math.round(starttime/1000);
                     let penality = solvedTime[id] - initial;
                     penality = Math.round(penality/5);
                     let point = Math.max(100,data.problems[j].points-penality);
                     obj.points += point;
                     obj.problemResults.push({contestId:data.problems[j].contestId,submissionId:submissionId[id]});
                  }
                  else 
                  {
                    obj.problemResults.push({contestId:-1,submissionId:-1});
                  }
                }
                rankList.push(obj);
            }
            if(noofRegistered>5)
            {
              await delay(1);
              for(let i=5;i<Math.min(10,noofRegistered);i++) 
              {
                let uri = "https://codeforces.com/api/user.status?handle=";
                uri += data.registered[i].handle;
                uri+= "&from=1&count=400";

                let data2 = await fetch(uri);
                data1 = await data2.json();

                let solvedTime = {},submissionId = {};

                for(let j=0;j<data1.result.length;j++)
                {
                    if((data1.result[j].verdict == "OK") &&  (data1.result[j].creationTimeSeconds*1000>=starttime) && (data1.result[j].creationTimeSeconds*1000<=starttime + duration)) 
                    { 
                        let id = data1.result[j].problem.contestId + data1.result[j].problem.index;
                        if(solvedTime[id]==undefined)
                        {
                          solvedTime[id]=data1.result[j].creationTimeSeconds;
                          submissionId[id]=data1.result[j].id;
                        }
                        else 
                        {
                          solvedTime[id]=data1.result[j].creationTimeSeconds;
                          submissionId[id]=data1.result[j].id;
                        }
                    }
                }
                let obj = {
                  handle : data.registered[i].handle,
                  points : 0,
                  problemResults : []
                };
                for(let j=0;j<data.problems.length;j++)
                {
                  let id = data.problems[j].contestId + data.problems[j].index;
                  if(solvedTime[id]!=undefined)
                  {
                    let initial = Math.round(starttime/1000);
                     let penality = solvedTime[id] - initial;
                     penality = Math.round(penality/5);
                     let point = Math.max(100,data.problems[j].points-penality);
                     obj.points += point;
                     obj.problemResults.push({contestId:data.problems[j].contestId,submissionId:submissionId[id]});
                  }
                  else 
                  {
                    obj.problemResults.push({contestId:-1,submissionId:-1});
                  }
                }
                rankList.push(obj);
              }
            }

            // sort ranlist according to points gained by each user
            rankList.sort((p1,p2)=> {
              if(p1.points>p2.points)
              {
                  return -1;
              }
              else if(p1.points<p1.points)
              {
                  return 1;
              }
              else
              {
                  return 0;
              }
            });


            let table = document.getElementById('myTable');
                
            let c = ['A','B','C','D','E','F','G','H','I','J'];
            let row = table.insertRow(0);
            let cell1 =row.insertCell(0);
            cell1.innerHTML = `#`;
            let cell2 = row.insertCell(1);
            cell2.innerHTML = `USERNAME`;
            let cell3 = row.insertCell(2);
            cell3.innerHTML = `POINTS`;
            for(let i=0;i<data.problems.length;i++)
            {
                let cell = row.insertCell(3+i);
                cell.innerHTML = `${c[i]}`;
            }

          
            for(let i=0;i<rankList.length;i++)
            {
                let row = table.insertRow(i+1);
                let cell1 =row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                

                let p1=i+1;
                cell1.innerHTML = `${p1}`;
                cell2.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://codeforces.com/profile/${rankList[i].handle}">${rankList[i].handle}</a>`;
                cell3.innerHTML = `${rankList[i].points}`;
                console.log(rankList[i].problemResults);
                for(let j=0;j<rankList[i].problemResults.length;j++)
                {
                    let cell = row.insertCell(3+j);
                   
                    if(rankList[i].problemResults[j].contestId!=-1)
                    {
                      if(secondsSinceEpoch - starttime <= duration) 
                      {
                        cell.innerHTML = 'AC';
                      } 
                      else 
                      {
                        cell.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="https://codeforces.com/contest/${rankList[i].problemResults[j].contestId}/submission/${rankList[i].problemResults[j].submissionId}">AC</a>`;
                      }
                    }
                    else
                    {
                      cell.innerHTML = `-`;
                    }
                    
                }
            }

            const res = await fetch('/save/mashup/rankList', { 
              method: 'POST', 
              body: JSON.stringify({rankList,contestId}),
              headers: {'Content-Type': 'application/json'}
            });
          
            const data5 = await res.json();
         };
         extractRankList();
         
    }
}

if(secondsSinceEpoch < starttime) 
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


