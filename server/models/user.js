const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//Mongoose middleware lets us run certain code after certain events. EG. we can run some code after we update document or before we update
//We cannt add methods to model until we define a schema for model
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

  // user.tokens.push({access,token});
  User.findOneAndUpdate({email:user.email},{$push: {tokens:{access,token}}},{new:true},function (err, user) {
    if(err) console.log("Something wrong when updating data");
    console.log(user);
  });

  return user.save().then(()=>{
    return token;
  });
};

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token,'abc123');
  }catch(e){
    return new Promise((resolve,reject)=>{
      reject();
    })
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  })
};

UserSchema.statics.findByCredentials = function(email,password){
  var User = this;

  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve,reject)=>{
      bcrypt.compare(password, user.password,(err,res)=>{
        if(res){
          resolve(user);
        }else{
          reject();
        }
      })
    });
  })
};

UserSchema.pre('save',function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }
});
var User = mongoose.model('User',UserSchema);

module.exports = {User};
