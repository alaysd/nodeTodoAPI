const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//We dont get docs back, we just get the number how many got deleted
// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove({'_id':'5a5f3d9593428e046c9eed6d'}).then((todo)=>{

//})
//
//
// Todo.findByIdAndRemove()


Todo.findByIdAndRemove('5a5f3d9593428e046c9eed6d').then((todo)=>{
  console.log(todo);
})
