import { load_Home_Screen } from "./start screen.js";
import { timerStartContinue } from "../index.js";

const clickAnywhere = () => {
    pulseStartText(document.getElementById("clickAnywhereText"), 2000);
    window.addEventListener("click", load_Home_Screen);

}

const pulseStartText = (text, waitingTime) => {

    setTimeout(() => {

        setTimeout(() => {
            text.className = "pulseTextOpacity";
            timerStartContinue.timerStartContinue = setInterval(() => {

                if (text.style.opacity == "0.4")
                    text.style.opacity = "1";

                else
                    text.style.opacity = "0.4";

            }, 100);
        }, 500);


    }, waitingTime); //1500

}

const close_Pulse_Start_Text = () => {
    clearInterval(timerStartContinue.timerStartContinue);
}

export { clickAnywhere, pulseStartText, close_Pulse_Start_Text }