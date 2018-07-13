"use strict";

var express = require('express');
var validator = require('express-validator');
var app=express();
var mongoose= require('mongoose');
var Models = require('./models');
var User = Models.User;
var DailyLog = Models.DailyLog;
var Suggestion = Models.Suggestion;
var friends = require('mongoose-friends')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

var fs = require('fs');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res)=> {
  let name = req.body.name;
  let username = req.body.username;

  //need to hash this
  let password = req.body.password;
  let phoneNumber = req.body.phoneNumber;


  let newUser = new User({
    name: name,
    username: username,
    password: password
  });

  newUser.save()
  .then(result => res.status(200))
  .catch(err => res.status(400).json({"error":err}));
});


app.post('/login', (req, res)=> {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username})
  .then(result=> {
    if (result.password === password){
      res.status(200);
    }
  })
  .catch(err => res.status(400).json({"error": err}));

});


//returns name and username of the current User
app.get('/:userid', (req, res)=> {
  let userId = req.params.userid;
  User.findById(userId)
  .then(result => {
    let returnObj = {
      "name": result.name,
      "username": result.username
    };
    res.json(returnObj);
  })
  .catch(err => res.status(400).json({"error": err}));
});


//finds dailyLogs by UserId, and returns all of them
app.get('/:userid/dailyLogs', (req, res)=> {
  let userId = req.params.userid;
  DailyLog.find({
    owner: userId
  })
  .then (results => {
    res.json(results);
  })
  .catch(err => res.status(400).json({"error": err}));
});


app.get('/:userid/stats', (req, res)=> {

});


app.get('/:userid/feed', (req, res)=> {

});


app.post('/:userid/reEvaluate', (req, res)=> {

});

app.post('/:userid/newJournal', (req, res)=> {

});

//expects {
// userid: '',
// color: '',
// emotions: [{}],
// reasons: ['',''],
// wantSuggestion: true/false
//
// }
app.post('/:userid/newLog', (req, res)=> {

});

app.post("/:userid/friendRequestSend", (req, res) => {
  User.findOne({name: req.body.name, phoneNumber: req.body.phoneNumber})
  .then((result) => User.requestFriend(req.params.userid, result._id))
  .then(() => res.json("request sent"))
})

app.post("/:userid/friendRequestAccept", (req, res) => {
  User.findOne({name: req.body.name})
  .then((result) => User.requestFriend(result._id, req.params.userid))
  .then(() => User.findById(req.params.userid))
  .then((result) => User.getFriends(result))
  .then((result) => {
    var friends = result.filter(user => user.status === "accepted")
    User.findByIdAndUpdate(req.params.userid, {friends: friends})
  }).catch((err) => console.log(err))
})

app.get("/:userid/getFriends", (req, res) => {
  User.findById(req.params.userid)
  .then((doc) => res.json({friends: doc.friends}))
  .catch((err) => console.log(err))
})

app.post("/:userid/removeFriend", (req, res) => {
  USer.removeFriend(req.params.userid, req.body.friend)
  .then((doc) => res.json(doc))
  .catch((err) => console.log(err))
})

app.listen(3000);
