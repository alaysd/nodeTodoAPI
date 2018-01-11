const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('error occured');
  }
  console.log('Mongodb connection established');
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a576cadf391ea03276b9fb1')
  },{
    $set: {
      eligible: false
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  })

  db.close();
});
