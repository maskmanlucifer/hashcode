const mongoose = require('mongoose');

const speedrunSchema = new mongoose.Schema({
    contestID : {
      type : Number
    },
    starttimeSecond:{
      type: Number
    },
    problemtimeSecond: {
      type: Number
    },
    phase : {
      type : String
    },
    author: {
      type: String
    },
    visibility : {
      type: String
    },
    level :{
      type: String
    },
    numberofProblems : {
        type : Number
    },
    problems: [{
        contestID: Number,
        index : String,
        points : Number
    }],
    registered :[{
        handle : String,
        email : String
    }],
    rankList : [{
        handle: String,
        problemResults : [{
            contestID: Number,
            submissionID: Number
        }]
    }]
});

const Speedrun = mongoose.model('speedrun', speedrunSchema);

module.exports = Speedrun;