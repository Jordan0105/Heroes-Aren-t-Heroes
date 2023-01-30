
import { play_Sound_Sprite, cloud_variables } from "./agreggator.js";
import { close_Gameplay_Screen, load_Show_Score_Screen, stop_Moving_Scenarios } from "./agreggator.js"


let checkPosition = 0;

function watchMyElement() {

    let colliderCloudX, colliderCloudY;

    const alienHitBox = window.getComputedStyle(document.getElementById("alienHitBox"));
    const characterHitBox = window.getComputedStyle(document.getElementById("characterHitBox"));
    const characterDiv = window.getComputedStyle(document.getElementById("characterDiv"));
    const alienDiv = window.getComputedStyle(document.getElementById("alienDiv"))

    //TODO: Change getComputedStyle(foo) to const foo = getComputedStyle(foo)
    const currentHitPosition = parseFloat(characterHitBox.left) + parseFloat(characterDiv.left);
    const currentHitPositionAlien = parseFloat(alienHitBox.left) + parseFloat(alienDiv.left);

    if (cloud_variables.existCloud) {
        const cloudDiv = window.getComputedStyle(document.getElementById("cloudsDiv"));

        const cloudHitBox = window.getComputedStyle(document.getElementById("cloudHitBox"));
        const currentHitPositionCloud = parseFloat(cloudHitBox.left) + parseFloat(cloudDiv.left);
        colliderCloudX = (currentHitPosition + parseFloat(characterHitBox.width)) >= currentHitPositionCloud && currentHitPosition <= (currentHitPositionCloud + parseFloat(cloudHitBox.width));
        colliderCloudY = !((parseFloat(characterDiv.top)) >= (parseFloat(cloudHitBox.height) + (parseFloat(cloudDiv.top) + parseFloat(cloudHitBox.top))));

    }
    //314.509px


    let didCollideAlien = (currentHitPosition + parseFloat(characterHitBox.width)) >= currentHitPositionAlien && currentHitPosition <= (currentHitPositionAlien + parseFloat(alienHitBox.width));

    if (didCollideAlien && parseFloat(characterDiv.top) >= 325) {

        play_Sound_Sprite("../../assets/Audio/SFX Audio/Smash v2 SFX.mp3");

        close_Gameplay_Screen();
        stop_Moving_Scenarios();
        load_Show_Score_Screen();

    }

    else if (colliderCloudX && colliderCloudY) {
        play_Sound_Sprite("../../assets/Audio/SFX Audio/Electricity SFX.mp3");

        close_Gameplay_Screen();
        stop_Moving_Scenarios();
        load_Show_Score_Screen();

    }

}

const collitionFunction = () => {
    checkPosition = setInterval(watchMyElement, 1);
}

export { collitionFunction, checkPosition }

