const passport = require('passport');
const User = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();

// Serializing user
passport.serializeUser((user,done)=> {
    done(null,user._id);
});


//deserializing user
passport.deserializeUser((id,done)=> {
    User.findById(id).then((user)=> {
        done(null,user);
    })
    
});

//the strategy passport will use to communicate with google
passport.use(
    new GoogleStrategy({
    callbackURL:'/google/callback',
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret
},
(accessToken,refreshToken,profile,done)=>{
   User.findOne({googleId:profile.id})
   .then((currentUser)=> {
        if(currentUser) {
        done(null,currentUser);
        } else {
            new User({ 
                isHandle:false,
                googleId:profile.id,
                name:profile.displayName,
            }).save().then((newUser)=>{
            done(null,newUser);
            })
    .catch(()=> {
            console.log("Error occured")
        })
    }
   })
})
)