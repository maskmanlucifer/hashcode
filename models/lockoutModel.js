const mongoose = require('mongoose');

const lockoutSchema = new mongoose.Schema({
    contestId : {
      type : Number
    },
    starttimeSecond:{
      type: Number
    },
    durationtimeSecond: {
      type: Number
    },
    creator : {
        handle : String,
        googleId : String
    },
    opponent :{
        handle : String,
        googleId : String
    },
    visibility : {
      type: String
    },
    minRange : {
      type:Number
    },
    maxRange : {
        type : Number
    },
    numberofProblems : {
        type : Number
    },
    problems: {
      type : Array
    },
    rankList : {
      type : Array
    }
});

const Lockout = mongoose.model('lockout', lockoutSchema);

module.exports = Lockout;