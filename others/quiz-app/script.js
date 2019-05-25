// Immediately Invoked Function Expression (for safety reasons):
//(function(){
    



var score, optionAlphabets, answerButtons, answ, displayed, n;

optionAlphabets = ['A', 'B', 'C', 'D'];
answerButtons = [document.getElementById('btn-1'), document.getElementById('btn-2'), document.getElementById('btn-3'), document.getElementById('btn-4')];

// displayed is an array which includes all the displayed questions on the screen.


first();

// Initial function that gets executed when a new game begins
function first() {
    score = 0;
    displayed = [];
    
    document.getElementById('submit-area').style.display = 'none';
    document.getElementById('winner-area').style.display = 'none';
    document.getElementById('form-area').style.display = 'block';
    
    // make all buttons non-disabled:
    document.getElementById('btn-1').disabled = false;
    document.getElementById('btn-2').disabled = false;
    document.getElementById('btn-3').disabled = false;
    document.getElementById('btn-4').disabled = false;
        
}


// Creating function construction for questions:
function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

// How to display questions with options on the screen?: (Here, when a question is loaded, the answers in it are assigned to each buttons. Also, the button values are assigned with the same data.)
Question.prototype.displayQuestion = function () {
    document.getElementById('form-header').textContent = this.question;

    for (opt = 0; opt < optionAlphabets.length; opt++) {
        answerButtons[opt].textContent = optionAlphabets[opt] + ': ' + this.answers[opt];
        answerButtons[opt].value = this.answers[opt];
    }
}

// Checking the answers:
Question.prototype.checkAnswer = function (ans) {
    if (ans === this.answers[this.correctAnswer]) {
        score++;    
    } else {
        score = score;
    }
}


// ----------------------------------------------
// Creating all the questions here:
var q1, q2, q3, q4, q5, q6, q7, q8, q9, q10;

q1 = new Question('What is the capital of Nepal?', ['Thimpu', 'Delhi', 'Kathmandu', 'London'], 2);

q2 = new Question('Who was the first president of the United States?', ['Abraham Lincoln', 'George Washington', 'Barack Obama', 'George W Bush'], 1);

q3 = new Question('Which sport does Lionel Messi represent?', ['Football', 'Basketball', 'Cricket', 'Tennis'], 0);

q4 = new Question('What is the real name of the chemical formula: H20?', ['Carbon-dioxide', 'Oxygen', 'Ammonia', 'Water'], 3);

q5 = new Question('Which country has the most unique (triangular) flag in the world?', ['Switzerland', 'Nepal', 'China', 'Jamaica'], 1);

q6 = new Question('Who won the FIFA WorldCup 2018?', ['Brazil', 'Germany', 'Belgium', 'France'], 3);

q7 = new Question('Which is not an Object-Oriented Programming Language?', ['HTML', 'JavaScript', 'Java', 'Python'], 0);

q8 = new Question('What sport does Sachin Tendulkar represent?', ['Football', 'Cricket', 'Basketball', 'Swimming'], 1);

q9 = new Question('What is the currency of Australia?', ['Pound', 'Rupees', 'Dollar', 'Ringgit'], 2);

q10 = new Question('Who invented Computer Mouse ? ', ['Douglas Engelbart ', 'Alexander Graham Bell ', 'Thomas Alva Edison ', 'Charles Babbage '], 0);
// ----------------------------------------------


var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

//for (displayed.length = 0; displayed.length <= questions.length; displayed.length++) {
n = Math.floor(Math.random() * questions.length);
//}

questions[n].displayQuestion();


// what happens if any button is clicked, among all 4 buttons?:
for (var j = 0; j < optionAlphabets.length; j++){
    var elem = document.getElementById('btn-' + (j + 1));
    elem.addEventListener('click', function(elem) {        
        answ = elem.srcElement.attributes.value.textContent;
        
        questions[n].checkAnswer(answ);
        
        displayed.push(n);
        
        nextQuestion();
    });
}


// Time for next question:
function nextQuestion() {
    // 1. create another random number:
    var m = Math.floor(Math.random() * questions.length);
        
    // 2. check if the random number already exists. If not, display the new question:
    if (displayed.indexOf(m) === -1) {
        questions[m].displayQuestion();
        
       // updating the value of n: 
        n = m;    
        
    } else if (displayed.indexOf(m) > -1 && displayed.length === questions.length){
        document.getElementById('btn-1').disabled = true;
        document.getElementById('btn-2').disabled = true;
        document.getElementById('btn-3').disabled = true;
        document.getElementById('btn-4').disabled = true;
        
        document.getElementById('submit-area').style.display = 'block';
        
    } else {
        nextQuestion();
      }
 } 
  


// What happens when we hit the Submit button?:
document.getElementById('submit-btn').addEventListener('click', function() {
    document.getElementById('form-area').style.display = 'none';
    
    document.getElementById('winner-area').style.display = 'block';
    
    document.getElementById('score').textContent = score;
      
});


// What happens when we hit the 'Play a New Game' button?:
document.getElementById('new-game-btn').addEventListener('click', first);

    
    
    
    
//})();