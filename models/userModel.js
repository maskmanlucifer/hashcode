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
    mashuplist :{
      type: Array
    },
    lockoutlist :{
      type: Array
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;