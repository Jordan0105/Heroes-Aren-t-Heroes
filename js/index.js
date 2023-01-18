

//AAAAAAAAA

let imageClicked = 0;

//HTML Element Selector

const startScreen = document.getElementById("startScreen");

let characterDiv = document.getElementById("characterDiv");
let characterImgSrc, characterAlt;
let body = document.getElementsByTagName("body")[0];
let main = getComputedStyle(document.getElementById("main"));
let bodyDimension = document.getElementsByTagName("body")[0];
let hitBoxCharacterStyle = document.getElementById("characterHitBox");
const scoreTitle = document.getElementById("scoreH3");

let timerJump = null,
    positionJump = 0,
    leftPosition = 0,
    jumpSpeed = 10,
    cloudPosition = 1300,
    cloudInterval1,
    existCloud = false,
    startMoving,
    timerStartContinue,
    createCloudsInterval,
    opacityAuraSetinterval,
    scoreTimer,
    checkPosition,
    opacity = 0;

let score = 0;
let highScore;

//* Functions

//Movements

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

//Clouds Function

const random_Top_Cloud = () => {

    const heightPx = [70, 100, 120, 50, 65, 80];
    const height = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    return heightPx[height];
}

const create_Cloud_Function = () => {


    // document.getElementsByClassName("cloudsDiv")[3].remove();
    if (existCloud == false) {

        const cloudsDiv = document.createElement("div");
        const hitBoxCloud = document.createElement("div");
        const cloudImg = document.createElement("img");

        cloudsDiv.id = "cloudsDiv";
        hitBoxCloud.id = "cloudHitBox";
        cloudImg.id = "cloudImg";


        document.getElementById("main").appendChild(cloudsDiv);
        cloudsDiv.appendChild(hitBoxCloud);
        cloudsDiv.appendChild(cloudImg);
        cloudImg.src = "../assets/Cloud.png";
        cloudImg.alt = "Cloud";

        document.getElementById("cloudsDiv").style.top = random_Top_Cloud() + "px";
        document.getElementById("cloudsDiv").style.left = "1300px";

        existCloud = true;

        cloudInterval1 = setInterval(moveClouds, 10); //10

    }
}

const moveClouds = () => {

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

        getSpeed(score);

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

        getSpeed(score);
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

function watchMyElement() {

    let hitBoxAlien, hitBoxCharacter, currentHitPosition,
        currentHitPositionAlien, hitBoxCloud, currentHitPositionCloud;
    let cloudDiv;
    let cloudCollideY;
    let didCollideCloud;

    hitBoxAlien = window.getComputedStyle(alienHitBox);
    hitBoxCharacter = window.getComputedStyle(characterHitBox);

    currentHitPosition = parseFloat(hitBoxCharacter.left) + parseFloat(window.getComputedStyle(characterDiv).left);
    currentHitPositionAlien = parseFloat(hitBoxAlien.left) + parseFloat(window.getComputedStyle(alienDiv).left);




    if (existCloud) {
        hitBoxCloud = window.getComputedStyle(cloudHitBox);
        cloudDiv = window.getComputedStyle(cloudsDiv);
        currentHitPositionCloud = parseFloat(hitBoxCloud.left) + parseFloat(window.getComputedStyle(cloudsDiv).left);
        didCollideCloud = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionCloud && currentHitPosition <= (currentHitPositionCloud + parseFloat(hitBoxCloud.width));
        cloudCollideY = !((parseFloat(window.getComputedStyle(characterDiv).top)) >= (parseFloat(hitBoxCloud.height) + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top))));

    }
    //314.509px


    let didCollideAlien = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionAlien && currentHitPosition <= (currentHitPositionAlien + parseFloat(hitBoxAlien.width));

    if (didCollideAlien && parseFloat(window.getComputedStyle(characterDiv).top) >= 325) {

        close_Gameplay_Screen();
        load_Show_Score_Screen();
    }

    else if (didCollideCloud && cloudCollideY) {
        close_Gameplay_Screen();
        load_Show_Score_Screen();

    }

}

const collitionFunction = () => {


    checkPosition = setInterval(watchMyElement, 1);

}

//Score

const load_Show_Score_Screen = () => {

    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById("gameOverScreen").style.cursor = "default";

    clickButtonScore();
    const infoGameOver = document.getElementById("infoGameOver");

    if (sessionStorage.length < 2) {
        highScore = score;
        infoGameOver.innerHTML = `Score: ${score}<br> High Score: ${highScore}`;
        sessionStorage.setItem("highScore", highScore);
    }
    else {

        highScore = sessionStorage.getItem("highScore");

        if (score > highScore) {
            highScore = score;
            sessionStorage.setItem("highScore", highScore);
            infoGameOver.innerHTML = `Score: ${score}<br> High Score: ${highScore}`;
        }
        else {
            infoGameOver.innerHTML = `Score: ${score}<br> High Score: ${highScore}`;
        }


    }
    score = 0;
}

const close_Home_Screen = () => {

    clearInterval(timerStartContinue);
    startScreen.classList.add("animate__animated", "animate__zoomOutDown");

    setTimeout(() => {
        startScreen.style.display = "none";
        startScreen.className = "";
    }, 1500);

}

const load_Gameplay_Screen_Event = () => {

    window.removeEventListener("keydown", load_Gameplay_Screen_Event);


    //* Delete the previous screen

    close_Choose_Character_Screen();

    //* Load the Gameplay Screen
    // setTimeout(() => {

    // setTimeout(() => {
    load_Gameplay_Screen();

    // }, 200);

    //!Error here


    document.getElementById("chooseCharacter").style.animation = "";


    // }, 800);





}

const load_Choose_Character_Screen_Event = (event) => {

    const allowedKeys = /^(Space|Enter|Backspace)$/;

    if (allowedKeys.test(event.code)) {

        window.removeEventListener("keydown", load_Choose_Character_Screen_Event);

        close_Home_Screen();

        //Load the select character screen
        setTimeout(() => {
            load_Choose_Character_Screen();
        }, 1200);
    }

}


const load_Home_Screen = () => {

    startScreen.style.display = "flex";

    setTimeout(() => {
        startText.classList.add("animate__animated", "animate__bounceIn", "animate__delay-1s");

        setTimeout(() => {
            timerStartContinue = setInterval(() => {

                startText.className = "";

                if (startText.style.opacity == "0.4")
                    startText.style.opacity = "1";

                else
                    startText.style.opacity = "0.4";

            }, 100);
        }, 500);


    }, 1500);

    setTimeout(() => {
        window.addEventListener("keydown", load_Choose_Character_Screen_Event);
    }, 2500);
}

const close_Choose_Character_Screen = () => {

    document.getElementById("chooseCharacter").className = "";

    // document.getElementById("chooseCharacter").style.animation = "slideInDownAnimation 0.8s ease-in-out";
    //Delete the event listeners

    for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {
        let element = document.getElementsByClassName("characterBoxSpace")[i];
        let elementImage = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild;
        elementImage.className = "";

        let clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);

    }

    document.getElementById("chooseCharacter").style.display = "none";
}

const show_Aura_Event = () => {

    let parent = document.getElementById("characterContainer");

    let clickedElement = event.target;

    let i = Array.from(parent.children).indexOf(clickedElement);

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
}

const disappear_Aura_Event = () => {

    const aura = document.getElementById("aura");
    clearInterval(opacityAuraSetinterval);
    aura.style.opacity = 0;

}

const clicked_Icon_Event = (i) => {

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
}

const load_Choose_Character_Screen = () => {

    document.getElementById("chooseCharacter").style.display = "flex";

    setTimeout(() => {


        for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {

            document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseenter", show_Aura_Event);
            document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseleave", disappear_Aura_Event)
            document.getElementsByClassName("characterBoxSpace")[i].addEventListener("click", () => clicked_Icon_Event(i));

        }
    }, 1000);


}

const close_Gameplay_Screen = () => {

    document.getElementById("main").style.display = "none";
    document.getElementById("cloudsDiv").remove();
    existCloud = false;
    cloudPosition = 1300;
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

const load_Gameplay_Screen = () => {

    document.getElementById("main").style.display = "block";
    document.getElementById("main").style.cursor = "none";

    document.getElementById("characterImg").src = characterImgSrc;
    document.getElementById("characterDiv").style.left = "50px";

    scoreTimer = setInterval(countScore = () => { score++; scoreTitle.innerHTML = "Score " + score; }, 100);
    alien_Start_Moving_Function();

    collitionFunction();
    createCloudsInterval = setInterval(create_Cloud_Function, 1000); //1000

    window.addEventListener("keydown", moveFunction);
}


//* Event Listeners


//? Here starts my program 

setTimeout(() => {
    window.addEventListener("keydown", load_Choose_Character_Screen_Event);
}, 3000);

const startText = document.getElementById("textStart");


setTimeout(() => {
    timerStartContinue = setInterval(() => {


        //! Error when load home screen startText its visible for 1 sec

        startText.className = "";
        if (startText.style.opacity == "0.4")
            startText.style.opacity = "1";

        else
            startText.style.opacity = "0.4";

    }, 100);
}, 2600);











//! Mouse Image it's showed after close the choose character screen

//Click on image element

const clickButtonScore = () => {


    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {

        imageClicked = i;
        document.getElementsByClassName("gameOverOptions")[i].addEventListener("click", click_Screen_Buttons_Event);

    }

}

const click_Screen_Buttons_Event = (event) => {

    let clickedImage = event.target.alt;

    for (let i = 0; i < document.getElementsByClassName("gameOverOptions").length; i++) {
        document.getElementsByClassName("gameOverOptions")[i].removeEventListener("click", click_Screen_Buttons_Event);
    }

    if (clickedImage === "Home Button") {

        load_Home_Screen();

    }
    else if (clickedImage === "Play Again Button") {
        load_Gameplay_Screen();
    }
    else {
        load_Choose_Character_Screen();
    }

    document.getElementById("gameOverScreen").style.display = "none";

}




