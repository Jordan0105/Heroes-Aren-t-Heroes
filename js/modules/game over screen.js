import { load_Home_Screen } from "./start screen.js";
import { load_Gameplay_Screen, gameplay_variables } from "./gameplay screen.js"
import { load_Choose_Character_Screen } from "./choose character screen.js";
import { play_music, stop_music, play_Sound_Sprite } from "./music.js";

const load_Show_Score_Screen = () => {

    stop_music();
    const play_List_Game_Over = [

        "../../assets/Audio/Game Over Screen/Undertale OST 15 Theme.mp3",
        "../../assets/Audio/Character Screen/Crash Bandicoot Theme.mp3",

    ];

    play_music(play_List_Game_Over);

    let highScore = 0;

    const gameOverScreen = document.getElementById("gameOverScreen");

    gameOverScreen.style.display = "block";
    // gameOverScreen.style.cursor = `url("${require("../../assets/Icons/Gloves_Icon.png")}"), auto`;
    gameOverScreen.style.cursor = `url("./../assets/Icons/Gloves_Icon.png"), auto`;

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
    stop_music();

    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {
        document.getElementsByClassName("gameOverOptions")[i].removeEventListener("click", click_Screen_Buttons_Event);
    }

    if (clickedImage === "Home Button") {

        exit_frames_animations(load_Home_Screen);

    }
    else if (clickedImage === "Play Again Button") {
        play_Sound_Sprite("../../assets/Audio/SFX Audio/Select Character v2 SFX.mp3");

        const play_List_Gameplay = [

            "../../assets/Audio/Gameplay Screen/Dr Mario Fever Theme.mp3",
            "../../assets/Audio/Gameplay Screen/Gourmet Race Theme.mp3",
            "../../assets/Audio/Gameplay Screen/Lost Woods Theme.mp3",
            "../../assets/Audio/Gameplay Screen/Undertale OST 100 Theme.mp3"

        ];

        play_music(play_List_Gameplay);
        exit_frames_animations(load_Gameplay_Screen);
    }
    else {
        play_Sound_Sprite("../../assets/Audio/SFX Audio/Select Character SFX.mp3");

        exit_frames_animations(load_Choose_Character_Screen);
    }

}

export { load_Show_Score_Screen }