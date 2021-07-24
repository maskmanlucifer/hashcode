const mongoose = require('mongoose');

const mashupSchema = new mongoose.Schema({
    contestId : {
      type : Number
    },
    starttimeSecond:{
      type: Number
    },
    durationtimeSecond: {
      type: Number
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
    registered :[{
      handle : String,
      googleId : String
    }],
    numberofProblems : {
        type : Number
    },
    problems: [{
        contestId: Number,
        index : String,
        points : Number,
        numberofAc : Number
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

const Mashup = mongoose.model('mashup', mashupSchema);

module.exports = Mashup;