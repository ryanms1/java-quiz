var quizInfo = document.getElementById('quizinfo')
var quiz = document.getElementById('quiz')
var ans1 = document.getElementById('answer1')
var ans2 = document.getElementById('answer2')
var ans3 = document.getElementById('answer3')
var ans4 = document.getElementById('answer4')
var question = document.getElementById('question')
var start = document.getElementById("startquiz")
var answerCheck = document.getElementById('answerCheck')
var submitScore = document.getElementById('submitScore')
var scoresButton = document.getElementById('scoresbutton')
var userScore = document.getElementById('userScore')
var initials = document.getElementById('initials')
var submit = document.getElementById('submit')
var back = document.getElementById('back')
var clear = document.getElementById('clear')
var list = document.getElementById('list')

var time = document.getElementById('time')
var currentQuestion = 0
var score = 0
var questions = [
 {
    question: "Commonly used data types do NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
}, {
    question: "The condition in an if/else statement is enclosed with _____",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
}, {
    question: "Arrays in Javascript can be used to store ________",
    answers: ["numbers and strings", "others arrays", "booleans", "all of the above"],
    answer: "all of the above"
}, {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
}, {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
}]

time.textContent = 55
function newquiz() {
    quizInfo.style.display = "none";
    quiz.style.display = "block";
    
    timeRemaining = 55
    time.textContent = timeRemaining

    var timer = setInterval(function() {
        timeRemaining--
        time.textContent = timeRemaining
        if (timeRemaining <= 0) {
            clearInterval(timer);
            if (currentQuestion < questions.length - 1)
            quizOver();
        }
    },1000)

    loadQuestion()
}

start.addEventListener("click", newquiz);


//show current question
function loadQuestion() {
        question.textContent = questions[currentQuestion].question;
        ans1.textContent = questions[currentQuestion].answers[0];
        ans2.textContent = questions[currentQuestion].answers[1];
        ans3.textContent = questions[currentQuestion].answers[2];
        ans4.textContent = questions[currentQuestion].answers[3];
};

//check answer deduct time if wrong, move to next question after answer selected

//event listener for clicked answer passing selected answer index into checkanswer function
ans1.addEventListener('click', () =>checkAnswer(0)) 
ans2.addEventListener('click', () =>checkAnswer(1)) 
ans3.addEventListener('click', () =>checkAnswer(2)) 
ans4.addEventListener('click', () =>checkAnswer(3)) 

function checkAnswer(selected) {
    answerCheck.style.display = 'block'
    if (questions[currentQuestion].answer === questions[currentQuestion].answers[selected]) {
        score++ 
        answerCheck.textContent = "Correct!"
    }
    else {
        timeRemaining -= 10
        time.textContent=timeRemaining
        answerCheck.textContent = "Wrong!"
    }

    currentQuestion++
    if (currentQuestion < questions.length) {
        loadQuestion();
    }
    else {
        quizOver()
    }



    
}
//quiz over
function quizOver() {
    quiz.style.display = 'none'
    answerCheck.style.display = 'none'
    submitScore.style.display = 'block'
    
    userScore.textContent = score + timeRemaining
}

//Store and View high scores functions 
submit.addEventListener('click', storeScore)

function storeScore(event) {
    event.preventDefault();

    if (initials.value === "") {
        alert("Please enter your initials!")
        return;
    } 

    submitScore.style.display = 'none'
    
    // get previously saved scores if any 
    var savedScores = localStorage.getItem("high scores")
    var userScores
    if (savedScores === null) {
        var userScores = []
    }
    else {
        userScores = JSON.parse(savedScores)
    }
    

    //add new score
    userScore = {initial: initials.value, score: userScore.textContent}
    userScores.push(userScore)

    //store score(s)
    localStorage.setItem("high scores", JSON.stringify(userScores))

    showScores();
}

function showScores() {
    quiz.style.display = "none";
    answerCheck.style.display = 'none'
    submitScore.style.display = 'none'
    quizInfo.style.display = 'none'
    scoresList.style.display = 'block'

    window.clearInterval()

    var savedScores = localStorage.getItem("high scores");
console.log(savedScores)
    var storedScores = JSON.parse(savedScores)
console.log(storedScores)

    for (i = 0; i <= storedScores.length; i++) {
        var newScore = document.createElement('li')
        newScore.innerHTML = storedScores[i].initial + " - " + storedScores[i].score
        list.appendChild(newScore)
    }
}

scoresButton.addEventListener('click', showScores) 

// go back button 
back.addEventListener('click', home)
function home() {
    location.reload()
}

// clear high scores
clear.addEventListener('click', clearScores)

function clearScores() {
    window.localStorage.removeItem("high scores")
    list.innerHTML = "No high scores available"
}