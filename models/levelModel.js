const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    levelname:{
      type: String
    },
    usercount: {
      type: String
    },
    contestcount:{
      type: String
    },
    problemcount :{
      type: Array
    }
});

const Level= mongoose.model('level', levelSchema);

module.exports = Level;