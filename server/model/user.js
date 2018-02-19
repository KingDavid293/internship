var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  Name: String,
  Password: String,
  hobies: {type:String, default:"foot ball , coding , music , esports "},
  eMail: {type:String, default:"abc"},
  PhoneNo: {type:Number, default:"0000000000"},
  sex: {type:String, default:"mpic.png"},
  aboutMe: {type:String, default:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
});

module.exports = mongoose.model('user',user);
