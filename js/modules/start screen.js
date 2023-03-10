import { load_Choose_Character_Screen_Event } from "./agreggator.js";
import { pulseStartText, close_Pulse_Start_Text } from "./agreggator.js";
import { play_music, stop_music, play_Sound_Sprite } from "./agreggator.js";

const startScreen = document.getElementById("startScreen");

const load_Home_Screen = () => {

    //* Play the music

    play_Sound_Sprite("../../assets/Audio/SFX Audio/Click v3 SFX.wav");

    window.removeEventListener("click", load_Home_Screen);

    const play_List_Home = [

        "../../assets/Audio/Start Screen/Animal Crossing Main Theme.mp3",
        "../../assets/Audio/Start Screen/Flower Garden Theme.mp3",
        "../../assets/Audio/Start Screen/Jump Up, Super Star Theme.mp3",
        "../../assets/Audio/Start Screen/Super Mario Bros Melee Theme.mp3"

    ];

    play_music(play_List_Home);

    //* Close the interval of the "Click anywhere to continue"

    close_Pulse_Start_Text();

    document.getElementById("clickAnywhereDiv").style.display = "none";

    const textStart = document.getElementById("textStart");

    startScreen.style.display = "flex";
    textStart.style.visibility = "visible";

    //* Animation to the text start (entrance)

    textStart.classList.add("animate__animated", "animate__bounceIn", "animate__delay-1s");

    //* Interval for the text: "Pulse start to continue"

    pulseStartText(textStart, 1500);

    //* We prevnt to clcik fast just while finishing playing animations.

    setTimeout(() => {
        window.addEventListener("keydown", load_Choose_Character_Screen_Event);
    }, 2500);
}

const close_Home_Screen = () => {

    stop_music();
    const textStart = document.getElementById("textStart");

    close_Pulse_Start_Text();

    textStart.className = "";
    textStart.style.visibility = "hidden";

    //* Start Screen exit animation

    startScreen.classList.add("animate__animated", "animate__zoomOutDown");

    //*  Timeout  while finishing playing animations

    setTimeout(() => {
        startScreen.style.display = "none";
        startScreen.className = "";
    }, 1500);

}



export { load_Home_Screen, close_Home_Screen, pulseStartText };