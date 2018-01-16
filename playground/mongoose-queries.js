const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5a5e34297dc36c336580b28';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

Todo.find({
  _id: id,//Mongoose makes an obejctID

}).then((todos)=>{
    console.log('Todos',todos);
});

Todo.findOne({
  _id: id,//Mongoose makes an obejctID

}).then((todo)=>{
    console.log('Todo:',todo);
});

Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('ID not found');
  }
  console.log('Hello',todo);
}).catch((e)=>{
  console.log('Invadlid id ');
})
