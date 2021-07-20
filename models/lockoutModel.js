const mongoose = require('mongoose');

const lockoutSchema = new mongoose.Schema({
    contestID : {
      type : Number
    },
    starttimeSecond:{
      type: Number
    },
    durationtimeSecond: {
      type: Number
    },
    author: {
      type: String
    },
    creator : {
        handle : String,
        email : String
    },
    opponent :{
        handle : String,
        email : String
    },
    visibility : {
      type: String
    },
    minRange : {
      type:Number
    },
    phase : {
      type : String
    },
    maxRange : {
        type : Number
    },
    numberofProblems : {
        type : Number
    },
    problems: [{
        contestID: Number,
        index : String,
        points : Number
    }],
    rankList : [{
        handle: String,
        points : Number,
        problemResults : [{
            contestID: Number,
            submissionID: Number
        }]
    }]
});

const Lockout = mongoose.model('lockout', lockoutSchema);

module.exports = Lockout;