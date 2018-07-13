var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);


var userSchema = mongoose.Schema({
  name: String,
  phoneNumber: Number,
  email: String,
  username: String,
  password: String,
  currentEmotionColor: {
    type: Number,
    public: Boolean
  }          //will have same value as most recent Emotion Color
  suggestions: [],                      //will be filled with Suggestion objects
  friends: []                           //will be filled with User objects
});

var User = mongoose.model('User', userSchema);


//add reasons?
var dailyLogSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User"
  },                          //User who owns this log
  journalBody: String,
  emotionColor: Number,
  reasons: [],
  detailedEmotions: [{
    name: String,
    intensity: Number
  }],                 //will be filled with objects for each emotion (name, intensity)
  completedSuggestion: String,
  creationTime: Date
});

var DailyLog = mongoose.model('DailyLog', dailyLogSchema);

var suggestionSchema = mongoose.Schema({

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User"
  },                      //User who owns this log
  name: String,
  description: String,
  ranking: Number,
  tags: []                            //will be filled with one of the big 5 emotions
});

var Suggestion = mongoose.model('Suggestions', suggestionSchema);

var models = {
  User: User,
  DailyLog: DailyLog,
  Suggestion: Suggestion
};

module.exports = models;
