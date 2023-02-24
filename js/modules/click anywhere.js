import { load_Home_Screen, timerStartContinue } from "./agreggator.js";


//* When you start the game for the first time.

const clickAnywhere = () => {

    pulseStartText(document.getElementById("clickAnywhereText"), 2000);
    window.addEventListener("click", load_Home_Screen);
}

//* Function to add a pulsing effect to the text 

const pulseStartText = (text, waitingTime) => {

    setTimeout(() => {

        //* Timeout to wait finishing playing text animation

        setTimeout(() => {
            text.className = "pulseTextOpacity";
            timerStartContinue.timerStartContinue = setInterval(() => {
                text.style.opacity = text.style.opacity === "0.4" ? text.style.opacity = "1" : text.style.opacity = "0.4";
            }, 100);
        }, 500);

    }, waitingTime);

}

const close_Pulse_Start_Text = () => {
    clearInterval(timerStartContinue.timerStartContinue);
}

export { clickAnywhere, pulseStartText, close_Pulse_Start_Text }