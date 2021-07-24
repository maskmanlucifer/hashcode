const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cfHandle:{
      type: String
    },
    googleId: {
      type: String
    },
    name:{
      type: String
    },
    isHandle :{
      type : Boolean
    },
    contestList : {
      type : Array
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;