const questions = [
    {
        question: "What is CSS?",
        answers: [
            { text: "CSS is a style sheet language", correct: false},
            { text: "CSS is designed to separate the presentation and content, including layout, colors, and fonts", correct: false},
            { text: "CSS is the language used to style the HTML documents", correct: false},
            { text: "All of the mentioned", correct: true},
        ]
    },
    {
        question: "Can negative values be allowed in padding property?",
        answers: [
            { text: "No", correct: true},
            { text: "Yes", correct: false},
            { text: "Depends on property", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following CSS selectors are used to specify a group of elements?",
        answers: [
            { text: "Tag", correct: false},
            { text: "Class", correct: true},
            { text: "Id", correct: false},
            { text: "Both class and tag", correct: false},
        ]
    },
    {
        question: "Which of the following CSS framework is used to create a responsive design?",
        answers: [
            { text: "bootstrap", correct: true},
            { text: "rails", correct: false},
            { text: "larawell", correct: false},
            { text: "django", correct: false},
        ]
    },
    {
        question: "Which of the following has introduced text, list, box, margin, border, color, and background properties?",
        answers: [
            { text: "CSS", correct: true},
            { text: "HTML", correct: false},
            { text: "Ajax", correct: false},
            { text: "PHP", correct: false},
        ]
    }
   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
    if(score < 3){
        nextButton.innerHTML = "Better luck next time";
    } else {
        nextButton.innerHTML = "Congratulations!";
    }
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz); // add event listener for "Play Again" button
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();
