
const express = require('express')

const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('json spaces', 1);

// Get the Javascript in the browser
app.use("/views", express.static("./outJavascripts"));

var connect = require('connect');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var quiz = require('./routes/quiz');

var MONGODB_URL = process.env.MONGODB_URL || 'mongodb://priede:peach2233d@ds159220.mlab.com:59220/priede';
mongoose.connect(MONGODB_URL);

var db;

MongoClient.connect('mongodb://priede:peach2233d@ds159220.mlab.com:59220/priede', (err, database) => {
  if (err) return console.log(err)
  db = database
})

var Schema = mongoose.Schema;
var uN = String;

var userSchema = new Schema ({
  userID: String
})

var questionSchema = new Schema ({
  question: [{}],
  answers: [{}]
})

var testSchema = new Schema({
    username: String,
    testName: String,
    questions: [],
    answers: [],
    correct: []
});

var User = mongoose.model('User', userSchema);
var Test = mongoose.model('Test', testSchema);
var Question = mongoose.model('Question', questionSchema);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.redirect('/views/main')
})

app.get('/views/main', function (req, res) {
  res.render('main')
})

app.post('/views/main', function (req, res) {
  uN = req.body.username;
  var u = new User({
        userID: req.body.username
  });

  db.collection('users').save(u, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
  })

  res.redirect('/views/quizzes')
})

app.get('/views/quizzes', function (req, res) {
  /*db.collection('tests').find().toArray((err, result) => {
    if (err) return console.log(err)

    var tests = [];

    var i = 0;
    var k = 0;
    while(i != result.length){
      if(result[i].username == uN){
        tests[k] = result[i];
      //  console.log(result[i]);
        k++;
      }
      i++;
    }

    res.render('quizzes')
  })*/
  res.render('quizzes');
})

app.post('/views/quizzes', function (req, res) {

 var i = 0;
  var j = 0;
  var k = 0;
  var numAns = 0;
  var q = [ ];

  while (i < 2){
    //console.log("hi");
    q[i] = [];
    q[i][j] = req.body.question[i]; //add id here if needed other [i][0] == question
    j++;
    while (k != (4)){
      q[i][j] = req.body.answer[numAns];
      k++;
      j++;
      numAns++;
    }
    k = 0;
    j = 0;
    i++;
  }

  var checked = [];
  if(req.body.chk_checked1 != undefined){
    checked.push("Q1: " + 1);
  }
  if(req.body.chk_checked2 != undefined){
    checked.push("Q1: " + 2);
  }
  if(req.body.chk_checked3 != undefined){
    checked.push("Q1: " + 3);
  }
  if(req.body.chk_checked4 != undefined){
    checked.push("Q1: " + 4);
  }
  if(req.body.chk_checked5 != undefined){
    checked.push("Q2: " + 1);
  }
  if(req.body.chk_checked6 != undefined){
    checked.push("Q2: " + 2);
  }
  if(req.body.chk_checked7 != undefined){
    checked.push("Q2: " + 3);
  }
  if(req.body.chk_checked8 != undefined){
    checked.push("Q2: " + 4);
  }
//  console.log(checked);
  //console.log(req.body.chk_checked);
//  console.log(req.body.chk_checked2);

//  console.log(req.body.chk_checked3);
/*  var a = 5;
  var b = 0;
  var c = [];
  while(b<2){
    if(req.body.chk_checked1[b] == 'on'){
      a = 0;
    }
    else if(req.body.chk_checked2[b] == 'on'){
      a = 1;
    }
    else if(req.body.chk_checked3[b] == 'on'){
      a = 2;
    }
    else if(req.body.chk_checked4[b] == 'on'){
      a = 2;
    }
    c[b] = a;
    b++;
  }*/

  //var r1 = req.body.chk_checked1;

//  console.log(req.body.checkbox);

  var t = new Test({
          username: uN,
        //  testName: req.body.title,
          questions: q,
      //    answers: [req.body.answer],
          correct: checked

        //  questions: req.body.question,
        //  answers: req.body.answer
      });

      t.save(function(err) {
          if (err)
             throw err;
          else
             console.log('saved data successfully...');
      });

    console.log(t);
    /*  db.collection('tests').save(t, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
      })
    console.log("redirect");*/

    res.redirect('show');
    //res.sendFile('QuestionPage.html', { root: path.join(__dirname, '/views') });
});


app.get('/views/show', function (req, res) {
  db.collection('tests').find().toArray((err, result) => {
    if (err) return console.log(err)

    var tests = [];

    var i = 0;
    var k = 0;
    while(i != result.length){
      if(result[i].username == uN){
        tests[k] = result[i];
        //console.log(result[i]);
        k++;
      }
      i++;
    }

    res.render('show', {tests});
  })
})

app.post('/views/show', function (req, res) {
    res.redirect('results');
  })


app.get('/views/results', function (req, res) {
    res.render('results');
  })



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
