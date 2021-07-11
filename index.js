const express = require('express');

const app=express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
   res.render('home');
});

app.listen(3000,()=>{
  console.log("You are listening to 3000 port");
});