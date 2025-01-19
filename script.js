const questions = [
    {
        question: "What is the correct way to declare a JavaScript variable?",
        answers: [
            { text: "var myVar;", correct: true },
            { text: "variable myVar;", correct: false },
            { text: "v myVar;", correct: false },
            { text: "declare myVar;", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msg('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true },
            { text: "msgBox('Hello World');", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msg('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true },
            { text: "msgBox('Hello World');", correct: false },
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onmouseover", correct: false },
            { text: "onchange", correct: false },
            { text: "onclick", correct: true },
            { text: "onmouseclick", correct: false },
        ]
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: [
            { text: "< This is a comment >", correct: false },
            { text: "// This is a comment", correct: true },
            { text: "# This is a comment", correct: false },
            { text: "* This is a comment *", correct: false },
        ]
    },
    {
        question: "Which JavaScript method is used to access an HTML element by its ID?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "getElement(id)", correct: false },
            { text: "getElementByClass()", correct: false },
            { text: "getId()", correct: false },
        ]
    },
    {
        question: "What will the following code output? console.log(typeof null);",
        answers: [
            { text: "object", correct: true },
            { text: "null", correct: false },
            { text: "undefined", correct: false },
            { text: "string", correct: false },
        ]
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        answers: [
            { text: "var myVar;", correct: true },
            { text: "variable myVar;", correct: false },
            { text: "v myVar;", correct: false },
            { text: "declare myVar;", correct: false },
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript that span multiple lines?",
        answers: [
            { text: "//", correct: false },
            { text: "< >", correct: false },
            { text: "/**/", correct: true },
            { text: "#", correct: false },
        ]
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            { text: "Math.max(x, y)", correct: true },
            { text: "Math.ceil(x, y)", correct: false },
            { text: "Math.high(x, y)", correct: false },
            { text: "ceil(x, y)", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let marks= document.getElementById('marks');
let questionNo=document.getElementById('questionNo');
let questionId=document.getElementById('questionId');

let myIntervalId;
let timeLeft = 30;
let timerElement = document.getElementById('timer');

function startTimer() {
    timeLeft = 30;
    timerElement.innerHTML = `Time: ${timeLeft}s`;
    myIntervalId = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(myIntervalId);
            handleNextButton();
        }
    }, 1000);
}

const startButton = document.getElementById('start-btn');

function home(){
    answerButtons.style.display = "none";
    nextButton.style.display = "none";
    questionId.style.display = "none";
    questionElement.style.display = "none";
    startButton.addEventListener("click", () => { 
        startButton.style.display = "none";
        startQuiz();
    });
}
home();

function resetTimer() {
    clearInterval(myIntervalId);
    startTimer();
}

function startQuiz(){
    timerElement.style.display = "block";
    answerButtons.style.display = "block";
    questionElement.style.display = "block";
    startTimer();
    currentQuestionIndex =0;
    score=0;
    marks.innerHTML = `Score ${score}`;
    nextButton.innerHTML="Next";
    showQuestion();
    marks.style.display= "block";
    questionElement.style.textAlign = "left";
    questionId.style.display = "block";
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionNo.innerHTML = currentQuestionIndex + 1;

    questionElement.innerHTML= currentQuestion.question;

    currentQuestion.answers.forEach( e=>{
        const button = document.createElement('button');
        button.innerHTML = e.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(e.correct){
            button.dataset.correct = e.correct;
            // console.log(button);
        }
        button.addEventListener("click", selectAnswer);
    })
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
      if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        marks.innerHTML=`Score ${score}`;
        // console.log(score)
      } else {
        selectedBtn.classList.add("incorrect");
      }
//    console.log(answerButtons.children);
      Array.from(answerButtons.children).forEach(
        button =>{
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        }
      );
      nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length ){
        handleNextButton();
    } else{
        startQuiz();
    }
} )

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.style.display="block";
    nextButton.innerHTML = "Play Again!"
    marks.style.display="none";
    questionId.style.display = "none";
    questionElement.style.textAlign = "center";
    timerElement.style.display = "none";
}

function handleNextButton(){
    currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
    showQuestion();
    resetTimer();
   } else {
    showScore();
   }   
}

function resetState(){
    nextButton.style.display="none";

   // let oldAnswers = document.getElementById('answer-buttons').firstChild;
    // console.log(oldAnswers);
    // console.log(answerButtons.firstChild)
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}