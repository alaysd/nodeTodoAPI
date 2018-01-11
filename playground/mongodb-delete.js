const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('err occured');
  }
  console.log('Connection established');

  //Delete Many
  // db.collection('Todos').deleteMany({
  //   text: 'Alay'
  // }).then((result)=>{
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({
  //   text: 'Alay Dhagia'
  // }).then((result)=>{
  //   console.log(result);
  // });
  //findOneAndDelete IMP Personal favorite
  // db.collection('Todos').findOneAndDelete({
  //   completed:false
  // }).then((result)=>{
  //   console.log(result);
  // },(err)=>{
  //   console.log(err);
  // });
  // db.close();
  db.collection('Todos').findOneAndDelete({
    _id: new ObjectID("5a5737c0aa2c200284ffcee2")
  }).then((result)=>{
    console.log(JSON.stringify(result,undefined,2));
  });
  db.close();
})
