var express = require('express');
var app = express();
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/user-info');



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));


app.post('/signup',function(req,res){
  var user = new User();
  user.Name = req.body.Name;
  user.Password = req.body.Password;
  user.eMail = req.body.eMail;
  user.sex = req.body.sex;

  var userTaken;
  var EmailExists;

  User.find({},function(err, users){

    if(err){
      res.status(500).send({error:"some error occured"});
    }else {
      for(var i = 0 ; i < users.length ;  i++){
        if(users[i].Name == user.Name){
          userTaken = true;
          break;
        } else {
          userTaken = false;
        }
        if(users[i].eMail == user.eMail){
          EmailExists = true;
          break;
        }else {
          EmailExists = false;
        }
      }
      if(!userTaken && !EmailExists){
        user.save(function(err, savedUser){
          if(err){
            res.status(500).send({error:"some error occured"});
          }else {
            res.status(200).send(savedUser);
          }
        });
      } else {
         if(userTaken){
           res.status(200).send("usertaken");
         } else {
           res.status(200).send("emailexists");
         }
      }
    }
  });
});

app.listen(3000, function(){
  console.log('server is running on port 3000');
});
