
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
    timerStartContinue,
    timerChooseCharacter,
    opacityAuraSetinterval,
    opacity = 0;

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
const newCloud = new Cloud();


//* Event Listeners



timerStartContinue = setInterval(() => {

    const startText = document.getElementById("textStart");

    if (startText.style.opacity == "0.4")
        startText.style.opacity = "1";

    else
        startText.style.opacity = "0.4";

}, 100);


//* Pointer Image Mouse

// const pointerImg = document.getElementById("selectedIcon");
// // pointerImg.style.visibility = "hidden";
// document.addEventListener('mousemove', (event) => {

//     //! The mouse pointer doesn't work on different sizes

//     pointerImg.style.left = (event.clientX - 370) + "px";
//     pointerImg.style.top = (event.clientY - 200) + "px";

// });


// Move cursor onto the image

for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {

    document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseenter", (event) => {
        // console.log(document.getElementsByClassName("characterBoxSpaceHidden")[i].id);
        const aura = document.getElementById("aura");
        clearInterval(opacityAuraSetinterval);
        opacity = 0;
        aura.style.opacity = opacity;

        opacityAuraSetinterval = setInterval(() => {


            aura.style.opacity = opacity;

            if (aura.style.opacity <= 0.6) {
                opacity = opacity + 0.05;
                aura.style.opacity = opacity;
            }
            else {
                clearInterval(opacityAuraSetinterval);
                opacity = 0;

            }



        }, 100);

        switch (i) {

            case 0:
                aura.style.top = "-12px";
                aura.style.left = "56px";
                break;

            case 1:
                aura.style.top = "-12px";
                aura.style.left = "488px";
                break;

            case 2:
                aura.style.top = "-12px";
                aura.style.left = "918px";
                break;

            //Characters 2nd row

            case 3:
                aura.style.top = "255px";
                aura.style.left = "56px";
                break;

            case 4:
                aura.style.top = "255px";
                aura.style.left = "494px";
                break;

            case 5:
                aura.style.top = "255px";
                aura.style.left = "922px";
                break;
        }
    });

    document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseleave", event => {

        const aura = document.getElementById("aura");
        clearInterval(opacityAuraSetinterval);
        aura.style.opacity = 0;

    })

    document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseleave", event => {

        const aura = document.getElementById("aura");
        clearInterval(opacityAuraSetinterval);
        aura.style.opacity = 0;

    })

    document.getElementsByClassName("characterBoxSpace")[i].addEventListener("click", event => {
        const selectedImageIcon = document.getElementById("selectedImageIcon");
        selectedImageIcon.style.display = "block";

        switch (i) {

            case 0:
                selectedImageIcon.style.top = "0px";
                selectedImageIcon.style.left = "347px";
                break;
            case 1:
                selectedImageIcon.style.top = "0px";
                selectedImageIcon.style.left = "768px";
                break;
            case 2:
                selectedImageIcon.style.top = "0px";
                selectedImageIcon.style.left = "1187px";
                break;

            //Characters 2nd row

            case 3:
                selectedImageIcon.style.top = "269px";
                selectedImageIcon.style.left = "347px";
                break;

            case 4:
                selectedImageIcon.style.top = "269px";
                selectedImageIcon.style.left = "768px";
                break;

            case 5:
                selectedImageIcon.style.top = "269px";
                selectedImageIcon.style.left = "1187px";
                break;
        }
        document.getElementById("chooseCharacterText").innerHTML = "Press Any Key To Continue";

        window.addEventListener("keydown", () => {

            //TODO: Here the code of the playing screen is loaded.

            const newCharacter = new Character(characterImg);
            window.addEventListener("keydown", () => {
                newCharacter.moveFunction(event);
            });

        })

    });

}