const mongoose = require('mongoose');

const mashupSchema = new mongoose.Schema({
    contestID : {
      type : Number
    },
    starttimeSecond:{
      type: Number
    },
    durationtimeSecond: {
      type: Number
    },
    author:{
      type: String
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
    phase : {
      type : String
    },
    registered :[{
      handle : String,
      email : String
    }],
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

const Mashup = mongoose.model('mashup', mashupSchema);

module.exports = Mashup;