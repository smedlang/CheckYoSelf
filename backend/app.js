"use strict";

var express = require('express');
var validator = require('express-validator');
var app=express();
var mongoose= require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var fs = require('fs');
var bodyParser = require('body-parser');

app.post('/register', (req, res)=> {

});

app.post('/login', (req, res)=> {

});

app.get('/:userid', (req, res)=> {

});


app.get('/:userid/dailyLogs', (req, res)=> {

});

app.get('/:userid/stats', (req, res)=> {

});

app.get('/:userid/feed', (req, res)=> {

});

app.post('/:userid/reEvaluate', (req, res)=> {

});
app.post('/:userid/newJournal', (req, res)=> {

});

app.post('/:userid/newLog', (req, res)=> {

});
