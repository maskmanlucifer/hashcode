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

const fizzbuzzRoutes = require('./routes/fizzbuzzRoutes');
const visualizerRoutes = require('./routes/visualizerRoutes');
const contestRoutes = require('./routes/contestRoutes');
mongoose.set('useFindAndModify', false);


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


app.listen(3000,()=>{
  console.log("You are listening to 3000 port");
});