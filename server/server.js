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
app.get('/todos',(req,res)=>{
  Todo.find().then((result)=>{
      res.send({result});
  },(e)=>{
    res.status(400).send(e);
  });
})
app.listen(3000,()=>{
  console.log('Started on port');
})

module.exports ={app};
