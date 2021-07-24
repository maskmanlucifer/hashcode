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
    problems: [{
        contestId: Number,
        index : String,
        points : Number
    }],
    rankList : [{
      handle: String,
      totalPoints : Number,
      problemResults : [{
          contestId: Number,
          submissionId: Number
      }]
  }]
});

const Lockout = mongoose.model('lockout', lockoutSchema);

module.exports = Lockout;