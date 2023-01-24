import { load_Home_Screen } from "./start screen.js";
import { load_Gameplay_Screen, gameplay_variables } from "./gameplay screen.js"
import { load_Choose_Character_Screen } from "./choose character screen.js";


const load_Show_Score_Screen = () => {

    let highScore = 0;

    const gameOverScreen = document.getElementById("gameOverScreen");

    gameOverScreen.style.display = "block";
    gameOverScreen.style.cursor = `url("${require("../../assets/Icons/Gloves_Icon.png")}"), auto`;

    for (let i = 0; i < document.getElementsByClassName("gameOverTextInfo").length; i++) {
        document.getElementsByClassName("gameOverTextInfo")[i].className = "gameOverTextInfo animate__animated animate__swing";

    }

    setTimeout(() => {
        for (let i = 0; i < document.getElementsByClassName("gameOverTextInfo").length; i++) {
            document.getElementsByClassName("gameOverTextInfo")[i].className = "gameOverTextInfo";
        }
        clickButtonScore();

    }, 1500);

    const infoGameOver = document.getElementById("infoGameOver");

    if (sessionStorage.getItem("highScore") === null) {
        highScore = gameplay_variables.score;
        infoGameOver.innerHTML = `Score: ${gameplay_variables.score}<br> High Score: ${highScore}`;
        sessionStorage.setItem("highScore", highScore);
    }
    else {

        highScore = sessionStorage.getItem("highScore");

        if (gameplay_variables.score > highScore) {
            highScore = gameplay_variables.score;
            sessionStorage.setItem("highScore", highScore);
            infoGameOver.innerHTML = `Score: ${gameplay_variables.score}<br> High Score: ${highScore}`;
        }
        else {
            infoGameOver.innerHTML = `Score: ${gameplay_variables.score}<br> High Score: ${highScore}`;
        }


    }
    gameplay_variables.score = 0;
}

const clickButtonScore = () => {


    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {

        document.getElementsByClassName("gameOverOptions")[i].addEventListener("click", click_Screen_Buttons_Event);

    }

}

const exit_frames_animations = (function_received) => {

    const gameOver = document.getElementById("gameOver");
    gameOver.classList.add("animate__animated", "animate__flipOutX");

    setTimeout(() => {

        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("gameOver").className = "";

        function_received();

    }, 500);
};


const click_Screen_Buttons_Event = (event) => {

    const clickedImage = event.target.alt;

    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {
        document.getElementsByClassName("gameOverOptions")[i].removeEventListener("click", click_Screen_Buttons_Event);
    }

    if (clickedImage === "Home Button") {

        exit_frames_animations(load_Home_Screen);

    }
    else if (clickedImage === "Play Again Button") {
        exit_frames_animations(load_Gameplay_Screen);
    }
    else {
        exit_frames_animations(load_Choose_Character_Screen);
    }


}

export { load_Show_Score_Screen }