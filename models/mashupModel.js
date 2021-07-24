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
    registered :{
      type : Array
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

const Mashup = mongoose.model('mashup', mashupSchema);

module.exports = Mashup;