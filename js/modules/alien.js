import { gameplay_variables } from "./gameplay screen.js"
let startMoving;

function getSpeed(gameplay_variables, alienSpeed) {
    switch (gameplay_variables.score, alienSpeed) {
        case 100:
            alienSpeed = 1.5;
            break;

        case 200:
            alienSpeed = 2.5;
            break;

        case 300:
            alienSpeed = 3.5;
            gameplay_variables.jumpSpeed = 7;
            break;

        case 400:
            alienSpeed = 4.5;
            gameplay_variables.jumpSpeed = 6;
            break;
        case 500:
            alienSpeed = 6;
            gameplay_variables.jumpSpeed = 5;
            break;

        case 600:
            gameplay_variables.jumpSpeed = 4;
            break;

        case 1000:
            alienSpeed = 9;
            gameplay_variables.jumpSpeed = 3;
            break;
    }
}

const alien_Start_Moving_Function = () => {

    const alienDiv = document.getElementById("alienDiv");
    const alienImg = document.getElementById("alienImg");
    let alienSpeed = 1;
    let position = 1320;
    startMoving = setInterval(alienMovementRight, 1);

    function alienMovementRight() {
        alienImg.style.transform = "scaleX(1)";

        getSpeed(gameplay_variables, alienSpeed);

        if (position <= 0) {
            clearInterval(startMoving);
            startMoving = setInterval(alienMovementLeft, 1);
        }
        else {
            position -= alienSpeed;
            alienDiv.style.left = position + "px";
        }
    }

    function alienMovementLeft() {

        getSpeed(gameplay_variables, alienSpeed);
        alienImg.style.transform = "scaleX(-1)";
        if (position >= 1200) {
            clearInterval(startMoving);
            startMoving = setInterval(alienMovementRight, 1);
        }
        else {
            position += alienSpeed;
            alienDiv.style.left = position + "px";
        }
    }


}

export { alien_Start_Moving_Function, getSpeed, startMoving }
