var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    required: true,
    minlength: 1,
    trim:true
  },
  completed:{
    type:Boolean,
    default: false
  },
  completedAt:{
    type:Number,
    default:null
  }
});

// var newTodo = new Todo({
//     text:'  Hello world   '
// });
//
// newTodo.save().then((result)=>{
//   console.log(result);
// },(err)=>{
//   console.log(err);
// });

// var otherTodo = new Todo({
//   text:'Alay Dhagia',
//   completed: true,
//   completedAt: 1234
// });
// otherTodo.save().then((result)=>{
//   console.log(result);
// },(err)=>{
//   console.log(err);
// });
//save new something

var User = mongoose.model('User',{
  email:{
    type:String,
    required : true,
    trim:true,
    minlength:1
  }

});

var user = new User({
  email:'dhagiaalay@gmail.com'
});
user.save().then((result)=>{
  console.log(result);
},(err)=>{
  console.log(err);
});
