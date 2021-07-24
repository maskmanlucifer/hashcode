let starttime = document.getElementById('starttime').textContent;
let duration = document.getElementById('duration').textContent;
let problems = document.getElementById('problems').textContent;
let type = document.getElementById('type').textContent;
let contestID = document.getElementById('contestID').textContent;
let secondsSinceEpoch = Date.now();



starttime = Number(starttime)*1000;
duration = Number(duration)*1000;
// contest is upcoming 
if(secondsSinceEpoch<starttime) {
    document.getElementsByClassName("contestError")[0].textContent = "CONTEST NOT STARTED";
 
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
  if(days) {
    finaltime = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  } else if(hours) {
    finaltime= hours + "h "
    + minutes + "m " + seconds + "s ";
  } else if(minutes) {
    finaltime =  minutes + "m " + seconds + "s ";
  } else {
    finaltime = seconds + "s ";
  }
  document.getElementById("demo").innerHTML = finaltime;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "CONTEST STARTED";
  }
}, 1000);
// contest is running
} else if(secondsSinceEpoch<=starttime+duration) {
  

  // case -1 -- first user makes request problemlist size is zero 
  // in this case make a call to backend to access register list 
  // generate problems fill them in array and send them to backend and save 
  // if page was problem page just show him problem page 

  // case-2 -- any user makes any request now problem size is not zero 
  // if asked for standing page 
  // pick last 500 submission of users and see in contest duration how many problem they solved 
  // create rank list on the basis of data 
  // show that page to users 

  // if asked for problems page 
  // pick last 500 submission of users in contets and for each problem see how many users solved that
  // show that list on the page 


  if(Number(problems)==0) {

  //   const res = await fetch('/api/registered', { 
  //     method: 'POST', 
  //     body: JSON.stringify({ duration,min_level,max_level,starttime,no_of_problems,visibility}),
  //     headers: {'Content-Type': 'application/json'}
  // });
    // let url ="/api/registered/";
    // url += contestID;
    //  fetch(url)
    //  .then((res)=>{
    //    return res.json();
    //  })
    //  .then((data)=>{
    //    console.log(data);
    //  })
    async function extract (){
      let url ="/api/registered/";
      url += contestID;
      let data = await fetch(url);
      cosole.log(data);
    }
    let data = extract();
    console.log(data);
  
  } else {
   if(type=="PROBLEMS") {

    
   } else if(type=="STANDING") {

   }
  }
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
  if(days) {
    finaltime = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  } else if(hours) {
    finaltime= hours + "h " 
    + minutes + "m " + seconds + "s ";
  } else if(minutes) {
    finaltime =  minutes + "m " + seconds + "s ";
  } else {
    finaltime = seconds + "s ";
  }
  document.getElementById("demo").innerHTML = finaltime;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "CONTEST ENDED";
  }
}, 1000);

} else  {
  if(type=="STANDING") {
    document.getElementsByClassName("contestError")[0].textContent = "STANDING CAN BE ACCESSED DURING CONTEST ONLY";
  }
  document.getElementById("demo1").textContent = "CONTEST IS FINISHED";
}
