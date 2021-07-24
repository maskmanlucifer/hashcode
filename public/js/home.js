let starttime = document.getElementById('starttime').textContent;
let duration = document.getElementById('duration').textContent;

let secondsSinceEpoch = Date.now();

starttime = Number(starttime)*1000;
duration = Number(duration)*1000;


if(secondsSinceEpoch<starttime) {

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

} else if(secondsSinceEpoch<=starttime+duration) {
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
} else {
  document.getElementById("demo1").textContent = "CONTEST IS FINISHED";
}
