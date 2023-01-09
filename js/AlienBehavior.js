//HTML Element Selector

const alienDiv = document.getElementById("alienDiv");
const alienImg = document.getElementById("alienImg");
let alienSpeed = 1;
// const scoreSpeed = [];

// for (i = 100; i <= 10000; i += 100) {
//     scoreSpeed.push(i);
// }
let position = 1320;
let startMoving = setInterval(alienMovementRight, 1);




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