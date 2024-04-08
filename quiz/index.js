function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}


Quiz.prototype.getIntro = function () {
    console.log("This is quiz intro");
}

Question.prototype.isCorrectAnswer = function (userAnswer) {
    return this.answer === userAnswer;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (userAnswer) {
    if (this.getQuestionByIndex().isCorrectAnswer(userAnswer)) {
        this.score++;
    }
    this.questionIndex++;
}

function Question(questionText, choices, answer) {
    this.questionText = questionText;
    this.choices = choices;
    this.answer = answer;
}

Quiz.prototype.isCorrectAnswer = function (userAnswer) {
    return this.answer === userAnswer;
}

function loadQuestions() {
    if (jsQuiz.isEnded()) {
        showScores();
    }
    else {
        let question = jsQuiz.getQuestionByIndex();
        document.getElementById("question").innerHTML = question.questionText;

        var choices = question.choices;
        for (var i = 0; i < choices.length; i++) {
            document.getElementById("choice" + i).innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
    }

    showProgress();
}

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        jsQuiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

function showProgress() {
    var currentQuestionNumber = jsQuiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + jsQuiz.questions.length;
}

function showScores() {
    var quizOverHTML = "<h1>Result</h1>";
    quizOverHTML += "<h2> Your scores: " + jsQuiz.score + ".And mark percentage is: " + (jsQuiz.score / questions.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = quizOverHTML;
}

let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

let jsQuiz = new Quiz(questions);

jsQuiz.getIntro();

loadQuestions();