

// handling level 
// let labels = ['PUPIL', 'SPECIALIST', 'EXPERT', 'CM', 'MASTER','IM','GM','IGM','LGM'];
// let rating = [1200,1400,1600,1900,2100,2300,2400,2600,3000];
// let count = [0,0,0,0,0,0,0,0,0];


// fetch('https://codeforces.com/api/user.ratedList?activeOnly=true')
//   .then(response => response.json())
//   .then((json)=>{
//     console.log("received");
//     console.log(json.result.length);
//     let sum =0;
//     for(let i=0;i<1;i++) {
//       for(let j=0;j<json.result.length;j++) {
//         // if(Number(json.result[j].rating)>=rating[i] && Number(json.result[j].rating)<rating[i+1]) {
//         //   count[i]++;
//         //   sum++;
//         // }
//         if(json.result[j].rating >=3000)
//         {
//             sum++;
//         }
//       }
//     }
//     console.log(json.result.length);
//     console.log(sum);
//     count[8]=json.result.length - sum;
//     console.log(count);
//   })