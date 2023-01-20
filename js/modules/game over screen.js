import { load_Home_Screen } from "./start screen.js";
import { load_Gameplay_Screen, gameplay_variables } from "./gameplay screen.js"
import { load_Choose_Character_Screen } from "./choose character screen.js";


const load_Show_Score_Screen = () => {

    let highScore;

    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById("gameOverScreen").style.cursor = "default";

    clickButtonScore();
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

const click_Screen_Buttons_Event = (event) => {

    let clickedImage = event.target.alt;

    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {
        document.getElementsByClassName("gameOverOptions")[i].removeEventListener("click", click_Screen_Buttons_Event);
    }

    if (clickedImage === "Home Button") {

        load_Home_Screen();

    }
    else if (clickedImage === "Play Again Button") {
        load_Gameplay_Screen();
    }
    else {
        load_Choose_Character_Screen();
    }

    document.getElementById("gameOverScreen").style.display = "none";

}

export { load_Show_Score_Screen }