const mongoose = require('mongoose');
const validator = require('validator');
const jtw = require('jsonwebtoken');
var UserSchema = new mongoose.Schema({

    email:{
      type:String,
      required : true,
      trim:true,
      minlength:1,
      unique: true,
      validate:{
        validator:(value)=>{
          return validator.isEmail(value);
        },
        message: '{VALUE} is not valid email'
      }
    },

    password:{
      type:String,
      require:true,
      minlength:6
    },
    tokens:[{
      access:{
        type: String,
        required: true
      },
      token:{
        type:String,
        required:true
      }
    }]

});
//Arrow function cannot bind a this keyword
UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({
    access:access,
    token:token
  });
  user.save().then(()=>{
    return token;
  });
};
var User = mongoose.model('User',UserSchema);

module.exports = {User};
