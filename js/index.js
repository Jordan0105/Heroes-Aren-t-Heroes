import { load_Choose_Character_Screen_Event } from "./modules/choose character screen.js";

// import "animate.css";
//Global Variales

let timerStartContinue = {
    timerStartContinue: null
}


const startText = document.getElementById("textStart");

setTimeout(() => {
    window.addEventListener("keydown", load_Choose_Character_Screen_Event);
}, 3000);



setTimeout(() => {

    timerStartContinue.timerStartContinue = setInterval(() => {
        //! Error when load home screen startText its visible for 1 sec

        startText.className = "";
        if (startText.style.opacity == "0.4")
            startText.style.opacity = "1";

        else
            startText.style.opacity = "0.4";

    }, 100);

}, 2600);


export { timerStartContinue, startText };