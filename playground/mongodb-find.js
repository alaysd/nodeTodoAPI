const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Error occured');
  }
  console.log('Coonection established');

  // db.collection('Users').find({
  //   text: 'Alay Thegia',
  //   _id : new ObjectID('5a57431f5a0aa102a8070285')
  // }).toArray().then((doc)=>{
  //   console.log('TODOS');
  //   console.log(JSON.stringify(doc,undefined,2));
  // },(err)=>{
  //   console.log(err);
  // });
  // db.collection('Users').find().count().then((count)=>{
  //   console.log(`TODOS count: ${count}`);
  // },(err)=>{
  //   console.log(err);
  // });
  db.collection('Users').find({
    text: 'BLAH BLAH BLAH'
  }).toArray().then((doc)=>{
    console.log(JSON.stringify(doc,undefined,2));
  });
  db.close();
})
