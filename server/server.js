const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _= require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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

//POST Users
app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  //Model methods
  //User.findByToken() //Donot require individual document
  //Instance methods
  //user.generateAuthToken//Responsible to add token to individual user document, saving it and return token
  console.log('POST METHOD');
  user.save().then(()=>{
    console.log('save method');
    return user.generateAuthToken();
  }).then((token)=>{
    console.log('xauth tokens');
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    console.log('catch');
    res.status(400).send(e);
  })
});

// var authenticate = (req,res,next)=>{
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user)=>{
//     if(!user){
//       return Promise.reject();
//     }
//     req.user =user;
//     req.token = token;
//     next();
//   }).catch((e)=>{
//     res.status(401).send();
//   })
// }

app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    })
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
})

app.listen(port,()=>{
  console.log(`started at port ${port}`);
});

module.exports ={app};
