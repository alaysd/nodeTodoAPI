const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data ={
  id:10
}

var token = jwt.sign(data,'123abc'); //take the data and signs it meaning hashes it and creates token
console.log(token);
var decoded =jwt.verify(token,'123abc') //takest the token and sees if the data was not manipulated
console.log('Decoded:',decoded);
//VERIFY Signature
// HMACSHA256(
//   base64UrlEncode(header) + "." +
//   base64UrlEncode(payload), key
//
// )


// /* ALL THE BELOW STUFF CAN BE DONE BY JWT

// var message = 'I am Alay';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`HASH: ${hash}`);


//Data from server to client
//ID helps us know which user should make the request.EG if we try to delete a todo with id 3
// but the user who created it does not match the id of the token then he should not be able to
// detele that as it is not its data.
// var data ={
//   id:4//THIS DATA IS SENT BACK TO CLIENT. We need to make sure that the client cant change this value of id i.e 4
// };
// //Hence we create this token which is then sent back to the user.
// var token ={
//   data,
//   hash: SHA256(JSON.stringify(data)+'somesecret').toString() //if the id in the data changes then the hash also changes and hence...
// }
// //What if the user changes the data.id and the hash value also, this technically can trick us, so it prevent it
// //we add some other text to the hash like in above 'somesecret'
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
//
// console.log(resultHash);
// if(resultHash ===token.hash){
//   console.log('Data was not changed');
// }else{
//   console.log('Dont trust this data');
// }
