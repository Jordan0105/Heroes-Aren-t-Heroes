import { load_Choose_Character_Screen_Event } from "./choose character screen.js";
import { timerStartContinue, startText } from "../index.js";

const startScreen = document.getElementById("startScreen");

const load_Home_Screen = () => {

    startScreen.style.display = "flex";

    setTimeout(() => {

        startText.classList.add("animate__animated", "animate__bounceIn", "animate__delay-1s");

        setTimeout(() => {
            timerStartContinue.timerStartContinue = setInterval(() => {
                startText.className = "";

                if (startText.style.opacity == "0.4")
                    startText.style.opacity = "1";

                else
                    startText.style.opacity = "0.4";

            }, 100);
        }, 500);


    }, 1500);

    setTimeout(() => {
        window.addEventListener("keydown", load_Choose_Character_Screen_Event);
    }, 2500);
}

const close_Home_Screen = () => {

    clearInterval(timerStartContinue.timerStartContinue);

    startScreen.classList.add("animate__animated", "animate__zoomOutDown");

    setTimeout(() => {
        startScreen.style.display = "none";
        startScreen.className = "";
    }, 1500);

}

export { load_Home_Screen, close_Home_Screen };