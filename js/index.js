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

        startText.className = "";
        if (startText.style.opacity == "0.4")
            startText.style.opacity = "1";

        else
            startText.style.opacity = "0.4";

    }, 100);

}, 2600);


export { timerStartContinue, startText };

//TODO: Close Moving Scenarios
//TODO: Hover.js
//TODO: When the score is greater than 100 the scenario will change
//TODO: Debug the code and the intervals, event listener and go on.
//TODO: Change mixins to extends
//TODO: Close choose character animation has a problem with top;
//TODO: Create an agreggator.js file to save all the imports and exports.
