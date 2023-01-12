
//HTML Element Selector

const startScreen = document.getElementById("startScreen");

let characterDiv = document.getElementById("characterDiv");
let characterImgSrc, characterAlt;
let body = document.getElementsByTagName("body")[0];
let main = getComputedStyle(document.getElementById("main"));
let bodyDimension = document.getElementsByTagName("body")[0];
let hitBoxCharacterStyle = document.getElementById("characterHitBox");

let timerJump = null,
    positionJump = 0,
    leftPosition = 0,
    jumpSpeed = 10,
    cloudPosition = 1300,
    cloudsGenerated = 0,
    cloudInterval1,
    existCloud = false,
    startMoving,
    timerStartContinue,
    createCloudsInterval,
    opacityAuraSetinterval,
    opacity = 0;

//* Functions

//Clouds Function

function randomTopCloud() {

    //40 0
    const heightPx = [70, 100, 120, 50, 65, 80];
    const height = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    return heightPx[height];
}

const moveClouds = () => {

    // if (document.getElementById("cloudsDiv").style.left <= "1300") {

    //     document.getElementById("cloudsDiv").style.visibility = "visible";
    // }


    if (document.getElementById("cloudsDiv").style.left == "-230px") {
        //Delete elements

        clearInterval(cloudInterval1);
        document.getElementById("cloudsDiv").remove();
        cloudPosition = 1300;
        existCloud = false;

    }
    else {
        existCloud = true;
        cloudPosition -= 3;//1

        document.getElementById("cloudsDiv").style.left = cloudPosition + "px";
    }

}

//Alien Functions

const alien_Start_Moving_Function = () => {

    const alienDiv = document.getElementById("alienDiv");
    const alienImg = document.getElementById("alienImg");
    let alienSpeed = 1;
    let position = 1320;
    startMoving = setInterval(alienMovementRight, 1);

    function getSpeed(score) {
        switch (score) {
            case 100:
                alienSpeed = 1.5;
                break;

            case 200:
                alienSpeed = 2.5;
                break;

            case 300:
                alienSpeed = 3.5;
                jumpSpeed = 7;
                break;

            case 400:
                alienSpeed = 4.5;
                jumpSpeed = 6;
                break;
            case 500:
                alienSpeed = 6;
                jumpSpeed = 5;
                break;

            case 600:
                jumpSpeed = 4;

            case 1000:
                alienSpeed = 9;
                jumpSpeed = 3;
                break;
        }
    }

    function alienMovementRight() {
        alienImg.style.transform = "scaleX(1)";

        // getSpeed(score);

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

        // getSpeed(score);
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

//Collition Functions

const collitionFunction = () => {


    let checkPosition = setInterval(watchMyElement, 1);
    let hitBoxAlien, hitBoxCharacter, currentHitPosition,
        currentHitPositionAlien, hitBoxCloud, currentHitPositionCloud;
    let cloudDiv;
    let cloudCollideY;

    function watchMyElement() {

        hitBoxAlien = window.getComputedStyle(alienHitBox);
        hitBoxCharacter = window.getComputedStyle(characterHitBox);


        // try {
        //     hitBoxCloud = window.getComputedStyle(cloudHitBox);
        //     cloudDiv = window.getComputedStyle(cloudsDiv);
        // }
        // //314.509px
        // catch (e) {
        //     console.log(`hitBoxAlien ${hitBoxAlien} hitBoxCharacter ${hitBoxCharacter}`)

        //     return;
        // }


        currentHitPosition = parseFloat(hitBoxCharacter.left) + parseFloat(window.getComputedStyle(characterDiv).left);
        currentHitPositionAlien = parseFloat(hitBoxAlien.left) + parseFloat(window.getComputedStyle(alienDiv).left);
        // currentHitPositionCloud = parseFloat(hitBoxCloud.left) + parseFloat(window.getComputedStyle(cloudsDiv).left);



        let didCollideAlien = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionAlien && currentHitPosition <= (currentHitPositionAlien + parseFloat(hitBoxAlien.width));
        // let didCollideCloud = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionCloud && currentHitPosition <= (currentHitPositionCloud + parseFloat(hitBoxCloud.width));
        // cloudCollideY = !((parseFloat(window.getComputedStyle(characterDiv).top)) >= (parseFloat(hitBoxCloud.height) + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top))));


        if (didCollideAlien && parseFloat(window.getComputedStyle(characterDiv).top) >= 325) {

            clearInterval(checkPosition);
            clearInterval(startMoving);
            // clearInterval(scoreTimer);
            clearInterval(createCloudsInterval);
            clearInterval(cloudInterval1);

            // showScore();

        }
        // else if (didCollideCloud && cloudCollideY) {


        //     // console.log("From top to up hit box " + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top)));
        //     // console.log("From top to bottom hitbox: " + (parseFloat(hitBoxCloud.height) + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top))));

        //     // console.log("Froom top to up hitbox character: " + parseFloat(window.getComputedStyle(characterDiv).top));
        //     // console.log("From top top to bottom hitbox: " + (parseFloat(window.getComputedStyle(characterDiv).top) + parseFloat(window.getComputedStyle(characterDiv).height)));

        //     clearInterval(startMoving);
        //     clearInterval(scoreTimer);
        //     clearInterval(createCloudsInterval);
        //     clearInterval(cloudInterval1);
        //     // showScore();
        // }

    }

}


const close_Home_Screen = () => {
    clearInterval(timerStartContinue);
    startScreen.style.display = "none";
}

const load_Gameplay_Screen_Event = () => {

    //* Delete the previous screen

    close_Choose_Character_Screen();

    //* Load the Gameplay Screen


    load_Gameplay_Screen();


}

const load_Choose_Character_Screen_Event = () => {

    //Load the select character screen
    close_Home_Screen();
    load_Choose_Character_Screen();
    window.removeEventListener("keydown", load_Choose_Character_Screen_Event);
}

//TODO: Create the loadHomeScreen Function

const close_Choose_Character_Screen = () => {

    document.getElementById("chooseCharacter").style.display = "none";

}

const load_Choose_Character_Screen = () => {

    document.getElementById("chooseCharacter").style.display = "flex";

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

        document.getElementsByClassName("characterBoxSpace")[i].addEventListener("click", event => {
            const selectedImageIcon = document.getElementById("selectedImageIcon");
            selectedImageIcon.style.display = "block";

            characterImgSrc = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild.src;
            characterAlt = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild.alt;

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

            window.addEventListener("keydown", load_Gameplay_Screen_Event);

        });

    }
}

const close_Gameplay_Screen = () => {

}

const load_Gameplay_Screen = () => {

    document.getElementById("main").style.display = "block";
    document.getElementById("main").style.cursor = "none";

    document.getElementById("characterImg").src = characterImgSrc;
    alien_Start_Moving_Function();
    collitionFunction();
    // createCloudsInterval = setInterval(createCloudFunction, 1000);

    moveFunction = (e) => {

        if (e.code == "Space") {

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


    //Not yet
    window.addEventListener("keydown", () => {
        moveFunction(event);
    });
}


//* Event Listeners

window.addEventListener("keydown", load_Choose_Character_Screen_Event);

timerStartContinue = setInterval(() => {

    const startText = document.getElementById("textStart");

    if (startText.style.opacity == "0.4")
        startText.style.opacity = "1";

    else
        startText.style.opacity = "0.4";

}, 100);


//! Mouse Image it's showed after close the choose character screen
