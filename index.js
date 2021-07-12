const express = require('express');

const app=express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

let user;

app.get('/',(req,res)=>{
   res.render('home');
});

app.get('/snippet',(req,res)=>{
  res.render('snippet');
});

app.get('/contest',(req,res)=>{
  res.render('contest');
});

app.listen(3000,()=>{
  console.log("You are listening to 3000 port");
});