const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cfusername:{
      type: String
    },
    googleid: {
      type: String
    },
    name:{
      type: String
    },
    ishandle :{
      type : Boolean
    },
    contestlist : [{
      type: String,
      contestID : Number
    }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;