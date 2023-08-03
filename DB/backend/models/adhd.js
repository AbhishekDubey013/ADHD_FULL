const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema1 = new Schema({
    name:{
        type:Array,
        required: true
    },

  });

  module.exports = mongoose.model('Qa',UserSchema1)