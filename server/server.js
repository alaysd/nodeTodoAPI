<<<<<<< HEAD
var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((result)=>{
    res.send(result);
  },(e)=>{
    res.status(400).send(e);
  })
})

app.post('/todos2',(req,res)=>{
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });
  todo.save().then((result)=>{
    res.send(result);
  },(err)=>{
    res.status(400).send(err);
  })
})

app.listen(3000,()=>{
  console.log('Started on port');
})
=======
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
>>>>>>> ed624b3aa94b2fcab049e7601eadd0c27c620ea4
