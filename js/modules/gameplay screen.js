import { collitionFunction, checkPosition } from "./collitions.js"
import { close_Choose_Character_Screen, characterImgSrc } from "./choose character screen.js";
import { alien_Start_Moving_Function, startMoving } from "./alien.js"
import { create_Cloud_Function, cloudInterval1, cloud_variables } from "./clouds.js"
import { startMovingScenarios } from "./Scenario.js";
let gameplay_variables = {
    score: 0,
    jumpSpeed: 10,
    positionJump: 0,
    timerJump: null
};

let scoreTimer, createCloudsInterval, leftPosition = 0;


const main = getComputedStyle(document.getElementById("main"));

function jumpAnimation(characterDiv) {


    if (gameplay_variables.positionJump <= 120) {

        clearInterval(gameplay_variables.timerJump);
        gameplay_variables.timerJump = setInterval(() => jumpDownAnimation(characterDiv), gameplay_variables.jumpSpeed);
    } else {

        gameplay_variables.positionJump -= 12;
        characterDiv.style.top = gameplay_variables.positionJump + "px";
    }
}

function jumpDownAnimation(characterDiv) {

    if (gameplay_variables.positionJump >= 400) {
        clearInterval(gameplay_variables.timerJump);
        gameplay_variables.timerJump = null;
    } else {
        gameplay_variables.positionJump += 11;
        characterDiv.style.top = gameplay_variables.positionJump + "px";
    }
}
const moveFunction = (e) => {
    const hitBoxCharacterStyle = document.getElementById("characterHitBox");
    const characterDiv = document.getElementById("characterDiv");

    if (e.code == "Space") {


        if (gameplay_variables.timerJump === null) {
            gameplay_variables.positionJump = 400;
            gameplay_variables.timerJump = setInterval(() => jumpAnimation(characterDiv), gameplay_variables.jumpSpeed);
        }

    }


    if (e.code == "ArrowRight") {

        let currentLeftPosition = parseInt(getComputedStyle(characterDiv).left);
        document.getElementById("characterImg").style.transform = "scaleX(1)";

        hitBoxCharacterStyle.style.left = "35px";

        if (currentLeftPosition <= parseInt(main.width) - 230) {

            leftPosition += 50;
            currentLeftPosition = leftPosition + "px";
            characterDiv.style.left = currentLeftPosition;

        }

    }

    if (e.code == "ArrowLeft") {
        let currentRigthPosition = parseInt(window.getComputedStyle(characterDiv).left);
        document.getElementById("characterImg").style.transform = "scaleX(-1)";

        hitBoxCharacterStyle.style.left = "50px";
        if (currentRigthPosition == 50) {

            leftPosition = 0;
            currentRigthPosition = leftPosition + "px";
            characterDiv.style.left = currentRigthPosition;

        }

        else if (currentRigthPosition != 0) {

            leftPosition -= 50;
            currentRigthPosition = leftPosition + "px";
            characterDiv.style.left = currentRigthPosition;

        }

    }

};

const load_Gameplay_Screen = () => {

    const main = document.getElementById("main");
    main.style.display = "block";
    main.style.cursor = "none";

    document.getElementById("characterImg").src = characterImgSrc;
    document.getElementById("characterDiv").style.left = "50px";

    scoreTimer = setInterval(() => {
        let scoreTitle = document.getElementById("scoreH3");
        gameplay_variables.score++; scoreTitle.innerHTML = "Score " + gameplay_variables.score;
    }, 100);

    alien_Start_Moving_Function();
    startMovingScenarios();
    collitionFunction();
    createCloudsInterval = setInterval(create_Cloud_Function, 1000); //1000

    window.addEventListener("keydown", moveFunction);
}

const load_Gameplay_Screen_Event = () => {

    window.removeEventListener("keydown", load_Gameplay_Screen_Event);


    //* Delete the previous screen

    close_Choose_Character_Screen();

    //* Load the Gameplay Screen


    setTimeout(() => {
        load_Gameplay_Screen();
        document.getElementById("chooseCharacter").style.animation = "";

    }, 1000);

}
const close_Gameplay_Screen = () => {


    // document.getElementById("main").classList.add("")

    document.getElementById("main").style.display = "none";

    if (cloud_variables.existCloud === true)
        document.getElementById("cloudsDiv").remove();



    cloud_variables.existCloud = false;

    cloud_variables.cloudPosition = 1300;
    leftPosition = 0;
    document.getElementById("characterDiv").style.left = "50px";



    // alienDiv.style.display = "none";
    // characterDiv.style.display = "none";


    clearInterval(checkPosition);
    clearInterval(startMoving);
    clearInterval(scoreTimer);
    clearInterval(createCloudsInterval);

    clearInterval(cloudInterval1);

    window.removeEventListener("keydown", moveFunction);

}
export { load_Gameplay_Screen_Event, close_Gameplay_Screen, load_Gameplay_Screen, gameplay_variables }
