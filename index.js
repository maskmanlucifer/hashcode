const express = require('express');

require('dotenv').config(); 

const mongoose = require('mongoose');
const fetch = require("node-fetch");
const passport = require('passport');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passportConfig = require('./passport/passportConfig');
const cookiesession = require('cookie-session');

const User = require('./models/userModel');
const Mashup = require('./models/mashupModel');
const Lockout = require('./models/lockoutModel');
const Speedrun = require('./models/speedrunModel');



const fizzbuzzRoutes = require('./routes/fizzbuzzRoutes');
const visualizerRoutes = require('./routes/visualizerRoutes');
const contestRoutes = require('./routes/contestRoutes');
mongoose.set('useFindAndModify', false);

let obj = {
  starttimeSecond: 1600,
  durationtimeSecond: 1800,
  author: "maskman_lucifer",
  visibility : "private",
  minRange : 1800,
  maxRange : 2000,
  registered :[{ handle : "maskman_lucifer", email : "amanmarksingh@gmail.com" },{ handle : "maskman_lucifer", email : "amanmarksingh@gmail.com" }],
  numberofProblems : 10,
  problems: [{ contestID: 1550, index : "B1", points : 1800},{ contestID: 1550, index : "B2", points : 1900}],
  rankList : []
};

new Mashup(obj).save().then(()=>{
  console.log("saved");
}).catch(()=>{
  console.log("failed");
})
let url=process.env.url;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true  },()=>{
  console.log("Database is connected");
});

const app=express();

app.use(express.static('public'));

app.use(express.json());

app.use(cookiesession({
  maxAge: 24*60*60*1000,
  keys: [process.env.KEY]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(profileRoutes);
app.use(fizzbuzzRoutes);
app.use(visualizerRoutes);
app.use(contestRoutes);


app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
   res.render('home',{user:req.user});
});

app.get('/error',(req,res)=>{
  res.render('error',{user:req.user});
})

app.listen(3000,()=>{
  console.log("You are listening to 3000 port");
});