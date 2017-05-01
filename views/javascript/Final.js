
/*Questions = [
  {
    Question: "Whats my name?",
    ChoiceA:  "Conor",
    ChoiceB:  "Tom",
    ChoiceC:  "Ryan",
    ChoiceD:  "Chris",

  },
  {
    Question: "Question 2?",
    ChoiceA: "A",
    ChoiceB: "B",
    ChoiceC: "C",
    ChoiceD: "D",
  },
  /*{
    Question: "Question 3?",
    ChoiceA: "1",
    ChoiceB: "2",
    ChoiceC: "3",
    ChoiceD: "4"
  }
]*/

/*Username = [];

var questions = [];
var ans = [];
/*

  document.getElementById('done').addEventListener('click', function() {
    var q1 = document.getElementById('question1').value;
    questions.push(q1);
    var a1 = document.getElementById('ans1').value;
    var a2 = document.getElementById('ans2').value;
    var a3 = document.getElementById('ans3').value;
    var a4 = document.getElementById('ans4').value;
    ans.push(a1);
    ans.push(a2);
    ans.push(a3);
    ans.push(a4);
    var q2 = document.getElementById('question2').value;
    questions.push(q2);
    var a1 = document.getElementById('ans5').value;
    var a2 = document.getElementById('ans6').value;
    var a3 = document.getElementById('ans7').value;
    var a4 = document.getElementById('ans8').value;
    ans.push(a1);
    ans.push(a2);
    ans.push(a3);
    ans.push(a4);
    console.log(questions, ans);
    console.log(ans);
  });

*//*

let x = 0;
var y = 1;


function questionContent() {
  $('#questionid').html(questions[x]);
  $('#a').html(ans[x+1]);
  $('#b').html(ans[x+2]);
  $('#c').html(ans[x+3]);
  $('#d').html(ans[x+4]);
}

function nextQuestion(number, y) {
  x = x+1;
  $('#questionid').html(questions[x]);
  $('#a').html(ans[x+5]);
  $('#b').html(ans[x+6]);
  $('#c').html(ans[x+7]);
  $('#d').html(ans[x+8]);
  progressBar(x, y);
  return x;

}*/
function home() {
  location.href = "main";
}

function finish() {
  location.href = "results";
}
function tryagain() {
  location.href = "show";
}
function relocate2() {
  location.href = "quizzes";
}


function addQuestion() {
  y++;
  $(".QuestionContainer:last").clone().insertAfter(".QuestionContainer:last");
  var question = $("h2").last();
  var choiceA = $('choiceA').last();
  var choiceB = $('choiceB').last();
  var choiceC = $('choiceC').last();
  var choiceD = $('choiceD').last();
  choiceA.value = "";
  choiceB.html("");
  choiceC.html("");
  choiceD.html("");
  question.html("Question #" + y);
}

function progressBar(x, y) {
  var elem = document.getElementById("progressBar");
  var progress = x+1;
  elem.style.width = x/y + "%";
}

let z = 1;
function counter(number) {
    z=z+1;
  return z;
}
