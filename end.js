const username = document.getElementById("username");
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//set in to the localstorage
// localStorage.setItem('highScores', JSON.stringify([]));
//getting from the localstorage


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const max_high_score = 5;
console.log(highScores);    
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) =>{
    console.log("clicked the save button");
    e.preventDefault();
    
    const score = {
        score : Math.floor( Math.random () * 100),
        name : username.value
    };
    console.log(score);

    highScores.push(score);
    //sorted array which do not have more than five scores and the lowest score will be removed
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem("highScores" , JSON.stringify(highScores));
    window.location.assign('/')
    console.log(highScores);
};

