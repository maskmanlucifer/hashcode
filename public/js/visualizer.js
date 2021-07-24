// getting contest id from html page 
let contest_id = Number(document.getElementById('contest_id').textContent);

// mapping rating ranges with levels

let findLevel = (rating) => {
    if(rating < 1200) 
    {

        return "NEWBIE";

    } 
    else if(rating < 1400) 
    {

        return "PUPIL";

    }  
    else if(rating < 1600) 
    {

        return "SPECIALIST";

    } 
    else if(rating < 1900) 
    {

        return "EXPERT";

    } 
    else if(rating < 2100) 
    {

        return "CM";

    } 
    else if(rating < 2300) 
    {

        return "MASTER";

    } 
    else if(rating < 2400) 
    {

        return "IM";

    } 
    else if(rating < 2600) 
    {

        return "GM";

    } 
    else if(rating < 3000) 
    {

        return "IGM";

    } 
    else 
    {

        return "LGM";

    }
};

// getting standing data 
let dataExtract =  async (contestID) => {
  let url = "https://codeforces.com/api/contest.standings?contestId=";
  url += contestID;
  
  let standing = await fetch(url);
  if(standing.status !== 200) 
  {
      throw new Error('Contest not exist');
  }
  let data = await standing.json();
  
  if(data.result.contest.phase !== "FINISHED") 
  {
    throw new Error('Contest is ongoing');
  }
  
  // getting rating change data 
  let url1 = "https://codeforces.com/api/contest.ratingChanges?contestId=";
  url1 += contestID;
  

  let ratingChange = await fetch(url1);
  
  let data1 = await ratingChange.json();
  
  
  let handleRating = {};
    
    // mapping handle with level 
    for(let i = data1.result.length - 1;i>=0;i--) 
    {
        
        let oldRating = data1.result[i].oldRating;
        if(oldRating >=0 ) 
        {

        } 
        else 
        {
            oldRating = 0;
        }
        handleRating[data1.result[i].handle]= findLevel(oldRating);
    }

  
  let solvedProblems = {};

  // giving indexes to problems
  let levelIndex = {};
  levelIndex["NEWBIE"] = 0;
  levelIndex["PUPIL"] = 1;
  levelIndex["SPECIALIST"] = 2;
  levelIndex["EXPERT"] = 3;
  levelIndex["CM"] = 4;
  levelIndex["MASTER"] = 5;
  levelIndex["IM"] = 6;
  levelIndex["GM"] = 7;
  levelIndex["IGM"] = 8;
  levelIndex["LGM"] = 9;

  let numberofProblems = data.result.problems.length;
  for(let i=0;i<numberofProblems;i++) 
  {
      solvedProblems[i] = [0,0,0,0,0,0,0,0,0,0];
  }
  
  // main algo for storing all problems done 
  for(let i=0;i<data.result.rows.length;i++) 
  {
      for(let j=0;j<numberofProblems;j++) 
      {
          if(data.result.rows[i].problemResults[j].points) 
          {
              solvedProblems[j][levelIndex[handleRating[data.result.rows[i].party.members[0].handle]]]++;
          }
      }
  }
  
  return {solvedProblems,numberofProblems};
};


// filling data in charts 
dataExtract(contest_id)
.then((data1) => {
    for(let i=0;i<data1.numberofProblems;i++) 
    {
        let arr = [0,0,0,0,0,0,0,0,0,0];
        for(let j=0;j<10;j++) 
        {
            arr[j]=data1.solvedProblems[i][j];
        }
        let id = 'myChart';
        id += i;
        var ctx = document.getElementById(id).getContext('2d');
        Chart.defaults.font.size = 15;
        Chart.defaults.color = '#F1C40F';
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['NEWBIE', 'PUPIL', 'SPECIALIST', 'EXPERT', 'CM', 'MASTER','IM','GM','IGM','LGM'],
                datasets: [{
                    label: '# OF USERS SOLVED',
                    data: arr,
                    backgroundColor: [
                        'rgb(128 , 128 , 128 , 0.3)',
                        'rgba(58, 235, 52, 0.3)',
                        'rgba(31, 242, 235, 0.3)',
                        'rgba(14, 44, 240, 0.3)',
                        'rgba(245, 37, 221, 0.3)',
                        'rgba(245, 227, 37, 0.3)',
                        'rgba(245, 190, 37, 0.7)',
                        'rgba(232, 43, 26, 0.2)',
                        'rgba(232, 43, 26, 0.4)',
                        'rgba(191, 26, 11, 0.7)'
                    ],
                    borderColor: [
                    'rgb(128 , 128 , 128 , 0.6)',
                    'rgba(58, 235, 52, 0.6)',
                    'rgba(31, 242, 235, 0.6)',
                    'rgba(14, 44, 240, 0.6)',
                    'rgba(245, 37, 221, 0.6)',
                    'rgba(245, 227, 37, 0.6)',
                    'rgba(245, 190, 37, 1)',
                    'rgba(232, 43, 26, 0.5)',
                    'rgba(232, 43, 26, 0.7)',
                    'rgba(191, 26, 11, 1)'
                    ],
                    borderWidth: 1,
                    borderRadius: 4,
                    
                }]
            },
            options: {
                
                plugins: {
                    title: {
                        display: true,
                        text: 'NUMBER OF USERS SOLVED THE PROBLEM',
                        color:'#F1C40F'
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: '#F1C40F'
                        }
                    }
                }
            }
        });
        }
    })
.catch((err)=>{

console.log(err.message);

})
