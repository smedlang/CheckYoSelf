"use strict";
var _ = require('underscore');
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


/**
- TESTED
- registers a user by name, username, and password
- still need to hash the password
**/
app.post('/register', (req, res)=> {
  let name = req.body.name;
  let username = req.body.username;

  //need to hash this
  let password = req.body.password;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;

  User.findOne({username: username})
  .then(result => {

    if (!result) {
      let newUser = new User({
        name: name,
        username: username,
        password: password
      });

      newUser.save()
      .then(result => {
        console.log('OK');
        res.json({"status": 200});
      })
      .catch(err => res.status(400).json({"error":err}));
    }
    else {
      res.json({"error": 'username is already taken!'});
    }

  }).catch(err=> res.json({"error": err}));
});


/**
- TESTED
- logs in just by checking that the username and password are correct
**/
app.post('/login', (req, res)=> {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username: username})
  .then(result=> {
    if (result.password === password){
      console.log('id', result._id);
      res.json({"status": 200});
    }
  })
  .catch(err => res.status(400).json({"error": err}));
});



/**
- TESTED
- returns name and username of the current User
**/
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

/**
- TESTED
- returns full log with updated journal
**/
app.post('/:userid/addJournal', (req, res)=> {
  let journalBody = req.body.journalBody;
  DailyLog.find({
    owner: req.params.userid
  })
  .then(results=> {
    results[results.length-1].journalBody = journalBody;
    console.log(results[results.length-1]);
  }).catch(err=> res.json({"error": err}));

});

//
app.post('/:userid/newLog', (req, res)=> {
  let error = '';
  let userid = req.params.userid;
  let color = req.body.color;
  let detailedEmotions = req.body.emotions;
  let reasons = req.body.reasons;
  let wantSuggestion = req.body.wantSuggestion;


  //want Suggestion?
  let newDailyLog = new DailyLog({
    owner: userid,
    journalBody: '',
    detailedEmotions: detailedEmotions,
    emotionColor: color,
    reasons: reasons,
    creationTime: new Date(),
    completedSuggestion: wantSuggestion ? '' : 'none'
  });

  newDailyLog.save(err=> error=err);
  console.log('saved!');

  let emotionInfo = [{
    name: "angry",
    sum: 0,
    items: ["angry", "irritated", "frustrated", "annoyed"]
  },
  {
    name: "sad",
    sum: 0,
    items: ["depressed", "sad", "empty", "gloomy", "hopeless"]
  },
  {
    name: "anxious",
    sum: 0,
    items: ["anxious", "afraid", "worried", "nervous", "panicked"]
  },
  {
    name: "guilt",
    sum: 0,
    items: ["guilty", "remorseful", "self-conscious"]
  },
  {
    name: "shame",
    sum: 0,
    items: ["shameful", "embarrasesed", "self-conscious"],
  },
  {
    name: "happy",
    sum: 0,
    items: ["happy", "excited", "calm", "confident", "content", "grateful", "motivated", "proud", "peaceful", "secure"]
  },
];

//sorting all emotions into the big 5
detailedEmotions.forEach(emotion => {
  _.forEach(emotionInfo, bigEmotion => {
    if(bigEmotion.items.includes(emotion.name)) {
      bigEmotion.sum += emotion.intensity
    }
  })
});

//average for each of the big 5
emotionInfo.forEach(emotion => {
  emotion.average = emotion.sum / emotion.items.length
});

<<<<<<< HEAD
app.post("/:userid/friendRequestSend", (req, res) => {
  User.findOne({name: req.body.name, phoneNumber: req.body.phoneNumber})
  .then((result) => User.requestFriend(req.params.userid, result._id))
  .then(() => res.json("request sent"))
=======
//sort emotionInfo by highest average (highest = most experienced emotion)
emotionInfo.sort((a, b) => (b.average - a.average));
let e1=emotionInfo[0].name;
let e2=emotionInfo[1].name;


if (!wantSuggestion){
  res.json({
    "suggestions": [],
    "log": newDailyLog
  });
} else{
  let suggestionsByOwner = [];
  Suggestion.find({
    owner: userid,
  }).then(result=> {
    suggestionsByOwner = result;
  })
  .catch (err=> error= err);
  //suggestions is an array of suggestions for that User
  let suggestionsByEmotion = suggestionsByOwner.filter(one => one.tags.includes(e1) || one.tags.includes(e2));
  suggestionsByEmotion.sort((a,b) => b.ranking - a.ranking);

  if (error){
    res.json({"error": error});
  }else{
    res.json({suggestions: suggestionsByEmotion});
  }
}
});



app.post("/:userid/friendRequestSend", (req, res) => {
  console.log('in friend request send')
  User.findOne({name: req.body.name, phoneNumber: req.body.phoneNumber})
  .then((result) => User.requestFriend(req.params.userid, result._id))
  .then(() => {
    res.json("request sent")
    console.log('sent!')
  })
>>>>>>> a49a66978bec55bc5c7f4e8d547bd09881d2cb84
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
<<<<<<< HEAD
  .then((doc) => res.json({friends: doc.friends}))
  .catch((err) => console.log(err))
})

app.post("/:userid/removeFriend", (req, res) => {
=======
  .then((doc) => res.json(doc.friends))
  .catch((err) => console.log(err))
})

app.post(":userid/removeFriend", (req, res) => {
>>>>>>> a49a66978bec55bc5c7f4e8d547bd09881d2cb84
  USer.removeFriend(req.params.userid, req.body.friend)
  .then((doc) => res.json(doc))
  .catch((err) => console.log(err))
})

app.listen(3000);
