//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

var user = {name:'andrew',age:25};
var {name} = user;
console.log(name);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Error occured');
  }
  console.log('Connected to mongodb server');

  db.collection('Todos').insertOne({
    text:'Simform',
    completed: false
  },(err,result)=>{
    if(err){
      return console.log('Unable to insert todo',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });

  // //Insert
  // db.collection('Todos').insertOne({
  //   text:'Alay Thegia',
  //   completed: true
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Err occured',err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  //show
  // try{
  //   console.log(JSON.stringify(db.collection('Todos').find()));
  // }catch(err){
  //   console.log('Error occured');
  // }

  db.close();
});
