var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
// mongoose.connect('mongodb://alaysd:root1234@ec2-52-48-53-96.eu-west-1.compute.amazonaws.com:27017/TodoApp');


module.exports ={
  mongoose
};
