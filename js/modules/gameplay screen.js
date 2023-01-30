import { collitionFunction, checkPosition, startMovingScenarios } from "./agreggator.js"
import { close_Choose_Character_Screen, characterImgSrc } from "./agreggator.js"
import { alien_Start_Moving_Function, startMoving } from "./agreggator.js"
import { create_Cloud_Function, cloud_variables } from "./agreggator.js"
import { stop_music, play_music, play_Sound_Sprite } from "./agreggator.js"

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
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Jump SFX.mp3");
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

    play_Sound_Sprite("../../assets/Audio/SFX Audio/Select Character v2 SFX.mp3");
    stop_music();

    window.removeEventListener("keydown", load_Gameplay_Screen_Event);
    const play_List_Gameplay = [

        "../../assets/Audio/Gameplay Screen/Dr Mario Fever Theme.mp3",
        "../../assets/Audio/Gameplay Screen/Gourmet Race Theme.mp3",
        "../../assets/Audio/Gameplay Screen/Lost Woods Theme.mp3",
        "../../assets/Audio/Gameplay Screen/Undertale OST 100 Theme.mp3"

    ];

    //* Delete the previous screen

    close_Choose_Character_Screen();

    play_music(play_List_Gameplay);
    //* Load the Gameplay Screen


    setTimeout(() => {
        load_Gameplay_Screen();
        document.getElementById("chooseCharacter").style.animation = "";

    }, 1000);

}
const close_Gameplay_Screen = () => {

    stop_music();

    // document.getElementById("main").classList.add("")

    document.getElementById("main").style.display = "none";
    document.getElementById("characterImg").style.transform = "scaleX(1)";

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

    clearInterval(cloud_variables.cloudInterval);

    window.removeEventListener("keydown", moveFunction);

}
export { load_Gameplay_Screen_Event, close_Gameplay_Screen, load_Gameplay_Screen, gameplay_variables }
