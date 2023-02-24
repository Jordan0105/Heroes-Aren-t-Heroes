
import { play_Sound_Sprite, cloud_variables } from "./agreggator.js";
import { close_Gameplay_Screen, load_Show_Score_Screen, stop_Moving_Scenarios } from "./agreggator.js"


let checkPosition = 0;

function watchPosition() {

    let colliderCloudX, colliderCloudY;

    //* Those are the the psoition and dimensions of the alien, character and clouds
    //* So we can check if the position of character collides with the alien current position

    const alienHitBox = window.getComputedStyle(document.getElementById("alienHitBox"));
    const characterHitBox = window.getComputedStyle(document.getElementById("characterHitBox"));
    const characterDiv = window.getComputedStyle(document.getElementById("characterDiv"));
    const alienDiv = window.getComputedStyle(document.getElementById("alienDiv"))

    //* The position of the hitbox 

    const currentHitPosition = parseFloat(characterHitBox.left) + parseFloat(characterDiv.left);
    const currentHitPositionAlien = parseFloat(alienHitBox.left) + parseFloat(alienDiv.left);

    //* If the cloud exists we get the current position and dimensions of the cloud

    if (cloud_variables.existCloud) {
        const cloudDiv = window.getComputedStyle(document.getElementById("cloudsDiv"));

        const cloudHitBox = window.getComputedStyle(document.getElementById("cloudHitBox"));
        const currentHitPositionCloud = parseFloat(cloudHitBox.left) + parseFloat(cloudDiv.left);
        colliderCloudX = (currentHitPosition + parseFloat(characterHitBox.width)) >= currentHitPositionCloud && currentHitPosition <= (currentHitPositionCloud + parseFloat(cloudHitBox.width));
        colliderCloudY = !((parseFloat(characterDiv.top)) >= (parseFloat(cloudHitBox.height) + (parseFloat(cloudDiv.top) + parseFloat(cloudHitBox.top))));

    }

    //* Check if there was a collision between alien and character

    let didCollideAlien = (currentHitPosition + parseFloat(characterHitBox.width)) >= currentHitPositionAlien && currentHitPosition <= (currentHitPositionAlien + parseFloat(alienHitBox.width));

    if (didCollideAlien && parseFloat(characterDiv.top) >= 325) {

        //* Play a sound

        play_Sound_Sprite("../../assets/Audio/SFX Audio/Smash v2 SFX.mp3");

        //*  If there was a collision then

        close_Gameplay_Screen();
        stop_Moving_Scenarios();
        load_Show_Score_Screen();

    }

    //* Check if there was a collision between character and cloud


    else if (colliderCloudX && colliderCloudY) {

        //* Play a sound

        play_Sound_Sprite("../../assets/Audio/SFX Audio/Electricity SFX.mp3");

        //*  If there was a collision then

        close_Gameplay_Screen();
        stop_Moving_Scenarios();
        load_Show_Score_Screen();

    }

}

const collisionFunction = () => {

    //* Here we track the position in every millisecond

    checkPosition = setInterval(watchPosition, 1);
}

export { collisionFunction, checkPosition }

