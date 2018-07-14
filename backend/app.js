"use strict";
var _ = require('underscore');
var express = require('express');
var validator = require('express-validator');
var app=express();
var mongoose= require('mongoose');
var Models = require('./models');
var User = Models.User;
var DailyLog = Models.DailyLog;
var initialSuggestions = require('./initialSuggestions').initialSuggestions;

// console.log(initialSuggestions);

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


function hashPassword(password){
  return password + process.env.SECRETHASH;
}



/**
- TESTED
- registers a user by name, username, and password
- still need to hash the password
**/
app.post('/register', (req, res)=> {
  let name = req.body.name;
  let username = req.body.username;

  //need to hash this
  let password = hashPassword(req.body.password);
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;


  User.findOne({username: username})
  .then(result => {

    if (!result) {
      let newUser = new User({
        name: name,
        username: username,
        password: password,
        suggestions: initialSuggestions,
        friends: []
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
    if (result.password === hashPassword(password)){
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





/** Tested
//finds dailyLogs by UserId, and returns all of them
**/
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





//stats to show: total number of logs
app.get('/:userid/stats', (req, res)=> {
  // most used suggestions DONE
  // total logs DONE
  // most frequent detailed emotions selected (top 5)
  // most productive activity (best delta per activity)
  // things that affect your emotions
});


//total logs
var getLogCount = (userId) => {
  DailyLog.find({
    owner: userId
  })
  .then(results => {
    let count = results.length
    return count;
  }).catch(err => res.json({'error': err}))
}

//most used suggestion
var getMostUsedSuggestion = (userId) => {
  User.findById(userId)
  .then(user => {
    let highest = 0;
    user.suggestions.forEach(sug => {
      if(sug.count > highest){
        highest = sug.count
      }
    })
    return highest;
  }).catch(err => res.json({'error': err}))
}


//most frequent detailed emotions
var gotEmoCounts = (userId) => {
  DailyLog.find({
    owner: userId
  })
  .then(logs => {
    let emos = [];
    logs.forEach(log => {
      emos.concat(log.oldDetailedEmotions)
    })

    counter = {}
    emos.forEach(function(word) {
      counter[word] = (counter[word] || 0) + 1;
    });
    emos.sort(function(x, y) {
      return counter[y] - counter[x];
    });

  })
}




//add suggestion
app.post('/:userid/addSuggestion', (req, res) => {
  let userid = req.params.userid;
  let name = req.body.name;
  let description = req.body.description;
  let tags = req.body.tags;

  User.findbyId(userid)
  .then(user => {
    let sugs = user.suggestions;
    sugs.push({
      name: name,
      description: description,
      count: 1,
      score: 1,
      tags: tags
    });
    res.json({"status": 200});
  }).catch(err => res.json({'error': err}))
})





//delete suggestion
app.post('/:userid/deleteSuggestion', (req, res) => {
  let suggestionToDelete = req.body.suggestion;
  let userid = req.params.userid;

  User.findById(userid)
  .then(result => {
    results.suggestions = results.suggestions.filter(sug => sug.name !== suggestionToDelete);
    res.json({"status": 200});
  }).catch(err=> res.json({"error": err}));
})








//
app.post('/:userid/reEvaluate', (req, res)=> {

  //saving new detailed emotions to contrast with the old detailed emotions in Daily Log
  let newDetailedEmotions = req.body.emotions;
  let completedSuggestion = req.body.completedSuggestion;
  let score = req.body.score;
  DailyLog.find({
    owner: req.params.userid
  })
  .then(results => {
    results[results.length-1].newDetailedEmotions = newDetailedEmotions;
    results[results.length-1].completedSuggestion = completedSuggestion;
    console.log(results[results.length-1]);
  }).catch(err => res.json({'error': err}));


  User.findbyId(req.params.userid)
  .then(user=> {
    user.suggestions.forEach(sug => {
      if (sug.name === completedSuggestion){
        let oldAverage = sug.count * sug.score
        sug.count++;
        sug.score = (oldAverage + score)/sug.count;
        res.json({"status": 200});
      }
    })
  })
});






/**
- TESTED
- returns log with updated journal
**/
app.post('/:userid/addJournal', (req, res)=> {
  let journalBody = req.body.journalBody;
  DailyLog.find({
    owner: req.params.userid
  })
  .then(results => {
    results[results.length-1].journalBody = journalBody;
    console.log(results[results.length-1]);
  }).catch(err=> res.json({"error": err}));
});






/**
// - TESTED
// - returns log OR returns relevant suggestions
**/
app.post('/:userid/newLog', (req, res) => {
  let error = '';
  let userid = req.params.userid;
  let color = req.body.color;
  let oldDetailedEmotions = req.body.emotions;
  let reasons = req.body.reasons;
  let wantSuggestion = req.body.wantSuggestion;


  //want Suggestion?
  let newDailyLog = new DailyLog({
    owner: userid,
    journalBody: '',
    oldDetailedEmotions: oldDetailedEmotions,
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
oldDetailedEmotions.forEach(emotion => {
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

//sort emotionInfo by highest average (highest = most experienced emotion)
emotionInfo.sort((a, b) => (b.average - a.average));
let e1=emotionInfo[0].name;
let e2=emotionInfo[1].name;


if (!wantSuggestion || e1 === 'happy'){
  res.json({
    "suggestions": [],
    "log": newDailyLog
  });
} else{
  let suggestionsByOwner = [];

  //setting this person's suggestions to suggestionsByOwner
  User.findById(userid)
  .then(user=> {
    suggestionsByOwner = user.suggestions;
  })
  .catch (err=> error= err);
  //suggestions is an array of suggestions for that User
  let suggestionsByEmotion = suggestionsByOwner.filter(one => one.tags.includes(e1) || one.tags.includes(e2));
  suggestionsByEmotion.sort((a,b) => b.score - a.score);

  if (error){
    res.json({"error": error});
  }else{
    res.json({suggestions: suggestionsByEmotion});
  }
}
});





/**

FRIEND STUFF

**/

app.post('/:userid/friendRequestSend', (req, res) => {
  console.log('in friend request send')
  User.findOne({name: req.body.name, phoneNumber: req.body.phoneNumber})
  .then((result) => User.requestFriend(req.params.userid, result._id))
  .then(() => {
    res.json({"status": 200})
    console.log('sent!')
  })
})





app.post('/:userid/friendRequestAccept', (req, res) => {
  User.findOne({username: req.body.username})
  .then((result) => {
    User.requestFriend(req.params.userid, result._id)})
    .then(() => res.json("request sent"))
    .catch((err) => console.log(err))
  })






  app.get('/:userid/getFriends', (req, res) => {
    User.findById(req.params.userid)
    .then((result) => {
      console.log(result);
      result.getAcceptedFriends()})
      .then((result) => {
        console.log(result)
      }).catch((err) => console.log(err))
    })






    app.post('/:userid/removeFriend', (req, res) => {
      User.removeFriend(req.params.userid, req.body.friendId)
      .then((doc) => res.json({"friend": doc}))
      .catch(err => res.json({"error": err}))
    })

    app.listen(3000);
