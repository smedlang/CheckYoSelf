var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);


var userSchema = mongoose.Schema({
  name: String,
  phoneNumber: Number,
  username: String,
  password: String,
  currentEmotionColor: Number,          //will have same value as most recent Emotion Color
  suggestions: [],                      //will be filled with Suggestion objects
  friends: []                           //will be filled with User objects
});

var dailyLogSchema = mongoose.Schema({
  owner: User,                          //User who owns this log
  journalBody: String,
  emotionColor: Number,
  detailedEmotions: [{
    name: String,
    intensity: Number
  }],                 //will be filled with objects for each emotion (name, intensity)
  completedSuggestion: String,
  creationTime: Date
});

var suggestionSchema = mongoose.Schema({
  owner: User,                         //User who owns this log
  name: String,
  description: String,
  ranking: Number,
  tags: []                            //will be filled with one of the big 5 emotions
})


var models = {
  User: mongoose.model('User', userSchema),
  DailyLog: mongoose.model('DailyLog', dailyLogSchema),
  Suggestion: mongoose.model('Suggestions', suggestionSchema)
};

module.exports = models;
