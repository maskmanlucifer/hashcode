const express = require('express');
let fs = require('fs');

const app=express();
const fizzbuzzRoutes = require('./routes/fizzbuzzRoutes');


app.use(express.static('public'));
app.use(express.json());
app.use(fizzbuzzRoutes);
app.set('view engine', 'ejs');

// start -- non authorization routes
app.get('/',(req,res)=>{
   res.render('home');
});

// app.get('/load',(req,res)=>{
//   fs.readFile("./db.json", "utf8", (err, jsonString) => {
//     if (err) {
//       res.send();
//       return;
//     }
//     let data=JSON.parse(jsonString);
//     res.send(data);
//   });
// })


// end -- non authorization routes

app.listen(3000,()=>{
  console.log("You are listening to 3000 port");
});