
//HTML Element Selector

const characterDiv = document.getElementsByClassName("characterDiv");
const characterImg = document.getElementById("characterImg");
const body = document.getElementsByTagName("body")[0];
const main = getComputedStyle(document.getElementById("main"));
const bodyDimension = document.getElementsByTagName("body")[0];
const hitBoxCharacterStyle = document.getElementById("characterHitBox");

let timerJump = null,
    positionJump = 0,
    leftPosition = 0,
    jumpSpeed = 10,
    cloudPosition = 1300,
    cloudsGenerated = 0,
    cloudInterval1,
    existCloud = false,
    timerStartContinue;



//Functions

function randomTopCloud() {

    //40 0
    const heightPx = [70, 100, 120, 50, 65, 80];
    const height = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    return heightPx[height];
}

//Classes

class Character {
    constructor(characterImg) {
        this.characterImg = characterImg;
    }

    moveFunction = (e) => {


        if (e.code == "Space") { //or keyIsFalse cause keyup

            if (timerJump === null) {
                positionJump = 400;
                timerJump = setInterval(jumpAnimation, jumpSpeed);

                function jumpAnimation() {
                    if (positionJump <= 120) {

                        clearInterval(timerJump);
                        timerJump = setInterval(jumpDownAnimation, jumpSpeed);
                    } else {

                        positionJump -= 12;
                        characterDiv.style.top = positionJump + "px";
                    }
                }

                function jumpDownAnimation() {


                    if (positionJump >= 400) {
                        clearInterval(timerJump);
                        timerJump = null;
                    } else {
                        positionJump += 11;
                        characterDiv.style.top = positionJump + "px";
                    }
                }
            }

        }


        if (e.code == "ArrowRight") {


            let currentLeftPosition = parseInt(getComputedStyle(characterDiv).left);
            characterImg.style.transform = "scaleX(1)";

            hitBoxCharacterStyle.style.left = "35px";
            if (currentLeftPosition <= parseInt(main.width) - 230) {
                leftPosition += 50;
                currentLeftPosition = leftPosition + "px";
                characterDiv.style.left = currentLeftPosition;

            }

        }

        if (e.code == "ArrowLeft") {
            let currentRigthPosition = parseInt(window.getComputedStyle(characterDiv).left);
            characterImg.style.transform = "scaleX(-1)";

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
}

class Cloud {
    constructor() {

    }
}
const newCharacter = new Character(characterImg);
const newCloud = new Cloud();


//Event Listeners


window.addEventListener("keydown", () => {
    newCharacter.moveFunction(event);
});

timerStartContinue = setInterval(() => {
    const startText = document.getElementById("textStart");
    if (startText.style.opacity == "0.4")
        startText.style.opacity = "1";

    else
        startText.style.opacity = "0.4";

}, 400);

const pointerImg = document.getElementById("selectedIcon");
document.addEventListener('mousemove', (event) => {
    pointerImg.style.left = event.pageX + "px";
    pointerImg.style.top = event.pageY + "px";

});