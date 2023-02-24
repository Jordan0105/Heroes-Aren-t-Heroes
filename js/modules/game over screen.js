import { load_Gameplay_Screen, gameplay_variables } from "./agreggator.js"
import { load_Choose_Character_Screen, load_Home_Screen } from "./agreggator.js"
import { play_music, stop_music, play_Sound_Sprite } from "./agreggator.js"


//If we crashed then Score Screen will appear

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

    //Change the cursor image

    gameOverScreen.style.cursor = `url("./../assets/Icons/Gloves_Icon.png"), auto`;

    //Add to the text animations
    for (let i = 0; i < document.getElementsByClassName("gameOverTextInfo").length; i++) {
        document.getElementsByClassName("gameOverTextInfo")[i].className = "gameOverTextInfo animate__animated animate__swing";

    }
    //We prevent to click inmediately (to show animations)

    setTimeout(() => {

        //If the user clicks on any button then we delete animations

        for (let i = 0; i < document.getElementsByClassName("gameOverTextInfo").length; i++) {
            document.getElementsByClassName("gameOverTextInfo")[i].className = "gameOverTextInfo";
        }

        //When user clciks on any of the 3 buttons
        clickButtonScore();

    }, 1500);

    const infoGameOver = document.getElementById("infoGameOver");

    //LocalStorage to save our score

    //If there is no saved score, we create a item in our local storage

    if (localStorage.getItem("highScore") === null) {
        highScore = gameplay_variables.score;
        infoGameOver.innerHTML = `Score: ${gameplay_variables.score}<br> High Score: ${highScore}`;
        localStorage.setItem("highScore", highScore);
    }

    //If there is saved score

    else {

        highScore = localStorage.getItem("highScore");

        //If you get a new highscore then we saved that highscore value and update the localstorage

        if (gameplay_variables.score > highScore) {
            highScore = gameplay_variables.score;
            localStorage.setItem("highScore", highScore);
            infoGameOver.innerHTML = `Score: ${gameplay_variables.score}<br> High Score: ${highScore}`;
        }

        //If you didn't :(

        else {
            infoGameOver.innerHTML = `Score: ${gameplay_variables.score}<br> High Score: ${highScore}`;
        }


    }

    //Reset the current score

    gameplay_variables.score = 0;
}

const clickButtonScore = () => {

    //Add a event lsitener to the home, play again and choose character button

    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {

        document.getElementsByClassName("gameOverOptions")[i].addEventListener("click", click_Screen_Buttons_Event);

    }

}

//This function will receive the function of what we clicked, if we
//clicked on home button, then the function received will be Return to Home Screen

const exit_frames_animations = (function_received) => {

    const gameOver = document.getElementById("gameOver");

    //Animation when we clicked on a button

    gameOver.classList.add("animate__animated", "animate__flipOutX");

    //Timeout while finishing playing animations

    setTimeout(() => {

        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("gameOver").className = "";

        function_received();

    }, 500);
};

//When we click on a button

const click_Screen_Buttons_Event = (event) => {

    const clickedImage = event.target.alt;
    stop_music();

    //Delete the event listener

    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {
        document.getElementsByClassName("gameOverOptions")[i].removeEventListener("click", click_Screen_Buttons_Event);
    }

    if (clickedImage === "Home Button") {

        exit_frames_animations(load_Home_Screen);

    }
    else if (clickedImage === "Play Again Button") {

        //Play the music of gameplay screen

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