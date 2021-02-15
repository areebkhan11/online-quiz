const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=  document.getElementById('questioncounter');
const scoreText =  document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questioncounter = 0;
let availableQuestions = [];
 
let questions = [
    {
        question : "Urdu was declared national language of Pakistan in:",
        choice1: "April 1950",
        choice2: "April 1955",
        choice3: "April 1954",
        choice4: "April 1952",
        answer : 3 
    },
    {
        question : "The first nuclear power plant in Pakistan was established at:",
        choice1: "Karachi",
        choice2: "Chashma",
        choice3: "Mianwali",
        choice4: "Rawalpindi",
        answer : 1
    },
    {
        question : "Which city is famous for chappal and Khussa?",
        choice1: "Gawadar",
        choice2: "Pishawar",
        choice3: "Gujranwala",
        choice4: "Sukkur",
        answer : 2
    },
    {
        question : " Which river flows through the Salt Range?",
        choice1: "River Gomal",
        choice2: "River Zobe",
        choice3: "River Swat",
        choice4: "River soan",
        answer : 4
    }
    
]

//Constants

const Correct_bonus = 10;
const Max_questions = 5;

startGame = () => {
    questioncounter = 0;
    score =0;
    availableQuestions = [...questions];
   
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questioncounter >= Max_questions){
        localStorage.setItem('mostRecentScore', score);
        // go to the end page 
        return window.location.assign("end.html")
    }
    questioncounter++;
    questionCounterText.innerText = `${questioncounter}/${Max_questions}` ;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+ number];
    });
availableQuestions.splice(questionIndex, 1);
acceptingAnswers= true;
};


choices.forEach(choice => {
    choice.addEventListener('click' , e => {
       if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        //to give color
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct'
        : 'incorrect'; 
        
        //=====Increase Score
        if(classToApply == 'correct'){
            incrementScore(Correct_bonus);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
            //delay
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          }, 1000);
    });
})

incrementScore = num => {
    score += num;
    scoreText.innerText= score;
}
startGame();