const scoreTitle = document.getElementById("scoreH3");
const gameOver = document.getElementById("gameOver");
const infoGameOver = document.getElementById("infoGameOver");

let score = 0;
let highScore;

const scoreTimer = setInterval(countScore = () => {
    score++;
    scoreTitle.innerHTML = "Score " + score;
}, 100);


function showScore() {
    scoreTitle.style.display = 'none';
    alienDiv.style.display = "none";
    characterDiv.style.display = "none";
    gameOver.style.display = "block";

    if (sessionStorage.length < 2) {
        highScore = score;
        infoGameOver.innerHTML = `Score: ${score}<br> High Score: ${highScore}`;
        sessionStorage.setItem("highScore", highScore);
    }
    else {

        highScore = sessionStorage.getItem("highScore");

        if (score > highScore) {
            highScore = score;
            sessionStorage.setItem("highScore", highScore);
            infoGameOver.innerHTML = `Score: ${score}<br> High Score: ${highScore}`;
        }
        else {
            infoGameOver.innerHTML = `Score: ${score}<br> High Score: ${highScore}`;
        }


    }

}