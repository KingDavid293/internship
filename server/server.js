var express = require('express');
var app = express();
var BodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/user-info');

var User = require('./model/user');

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


app.post('/login',function(req,res){
  var user = new User();
  user.Password = req.body.Password;
  user.eMail = req.body.eMail;

 var passMatch = false;
 var noEmail = true;
 var j;


  User.find({},function(err, users){
    if(err){
      res.status(500).send({error:"some error occured"});
    }else {
      for(var i = 0 ; i < users.length ;  i++){
        if(users[i].eMail == user.eMail){
          noEmail = false;
          if(users[i].Password == user.Password){
            passMatch = true;
            j = i;
            break;
          }
        }
      }
      if(passMatch){
        res.status(200).send(users[j]);
      } else {
        if(noEmail){
          res.status(200).send("noEmail");
        }else {
          res.status(200).send('{"message":"passwordnotmatched"}');
        }
      }
    }
  });
});



app.post('/edit',function(req,res){
  //

  var user = new User();

  user.Name = req.body.Name;
  user.PhoneNo = req.body.PhoneNo;
  user.aboutMe = req.body.aboutMe;
  user.sex = req.body.sex;
  user.hobies = req.body.hobies;
  user._id = req.body._id;
  //
//   User.findByIdAndUpdate( req.body.id, { $set: { Name : req.body.Name , PhoneNo : req.body.PhoneNo , aboutMe : req.body.aboutMe , sex : req.body.sex , hobies : req.body.hobies }} , { new : true }, function (err, user) {
//   if (err) res.send("error occored");
//   console.log(User);
//   res.send(user);
// });

  User.findById(user._id,function(err, user){
    if(err){
      res.status(500).send({error:"some error occured"});
    } else {
       User().save(function(err, user){
         if (err) {
           res.send("errer occured");
         } else {
            res.send(user);
         }
         });
    }

  });
});





app.listen(3000, function(){
  console.log('server is running on port 3000');
});
