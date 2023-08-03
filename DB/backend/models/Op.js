const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
    },
    mail:{
        type:String,
        required:true
    },

  });

  module.exports = mongoose.model('Op',UserSchema)

//   Learning:

//   1. Here Op is the collection in DB.
//   2. For inserting collection use type array.
  