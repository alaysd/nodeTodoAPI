const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _= require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

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

// GET /todos/1234

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
      return res.status(404).send();
  })
});

app.delete('/todos/:id',(req,res)=>{
  // get the id
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.send(todo);
  }).catch((e)=>{
    res.status(400).send();
  });
});
//UPDATE route

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed)&& body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }).catch((e)=>{
    return res.status(400).send();
  });

});

app.listen(port,()=>{
  console.log(`started at port ${port}`);
});

module.exports ={app};
