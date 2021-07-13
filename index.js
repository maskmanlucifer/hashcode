const express = require('express');

const app=express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

// start -- non authorization routes
app.get('/',(req,res)=>{
   res.render('home');
});

app.get('/home',(req,res)=>{
  res.render('home');
});

app.get('/fizzbuzz',(req,res)=>{
  res.render('fizzbuzz');
});

app.get('/contest',(req,res)=>{
  res.render('contest');
});

app.get('/visualizer',(req,res)=>{
  res.render('visualizer');
});

// end -- non authorization routes

app.listen(3000,()=>{
  console.log("You are listening to 3000 port");
});