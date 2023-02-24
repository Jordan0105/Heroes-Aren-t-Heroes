import { gameplay_variables } from "./agreggator.js"
let startMoving = 0;

//* This is the speed of the alien and the jump of the character,
//* as long as you survive, the speed will increase

function getSpeed(gameplay_variables, alienSpeed) {

    switch (gameplay_variables.score) {
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
    return alienSpeed;
}

//* When you chose the character and hit again to play
//* The alien will start to move

const alien_Start_Moving_Function = () => {

    const alienDiv = document.getElementById("alienDiv");
    const alienImg = document.getElementById("alienImg");
    let alienSpeed = 1;
    let position = 1320;

    //* The alien will start moving

    startMoving = setInterval(alienMovementRight, 1);


    //* When the alien heads to the right

    function alienMovementRight() {

        alienImg.style.transform = "scaleX(1)";
        alienSpeed = getSpeed(gameplay_variables, alienSpeed);

        //* If the alien reaches the right limit 
        if (position <= 0) {
            clearInterval(startMoving);
            startMoving = setInterval(alienMovementLeft, 1);
        }

        //* If not

        else {
            position -= alienSpeed;
            alienDiv.style.left = position + "px";
        }
    }

    function alienMovementLeft() {

        alienSpeed = getSpeed(gameplay_variables, alienSpeed);
        alienImg.style.transform = "scaleX(-1)";

        //* When the alien reaches the left limit

        if (position >= 1200) {
            clearInterval(startMoving);
            startMoving = setInterval(alienMovementRight, 1);
        }

        //* If not

        else {
            position += alienSpeed;
            alienDiv.style.left = position + "px";
        }
    }


}

export { alien_Start_Moving_Function, getSpeed, startMoving }
