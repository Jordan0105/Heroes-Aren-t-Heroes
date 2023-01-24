import { cloud_variables } from "./clouds.js"
import { close_Gameplay_Screen } from "./gameplay screen.js"
import { load_Show_Score_Screen } from "./game over screen.js";
import { stop_Moving_Scenarios } from "./Scenario.js";
let checkPosition = 0;

function watchMyElement() {

    let colliderCloudX, colliderCloudY;

    //TODO: Change this variables to getComputedStyle(document.getElementById("element")).getPropertyValue("left");

    const hitBoxAlien = window.getComputedStyle(alienHitBox);
    const hitBoxCharacter = window.getComputedStyle(characterHitBox);

    const currentHitPosition = parseFloat(hitBoxCharacter.left) + parseFloat(window.getComputedStyle(characterDiv).left);
    const currentHitPositionAlien = parseFloat(hitBoxAlien.left) + parseFloat(window.getComputedStyle(alienDiv).left);

    if (cloud_variables.existCloud) {
        const hitBoxCloud = window.getComputedStyle(cloudHitBox);
        const cloudDiv = window.getComputedStyle(cloudsDiv);
        const currentHitPositionCloud = parseFloat(hitBoxCloud.left) + parseFloat(window.getComputedStyle(cloudsDiv).left);
        colliderCloudX = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionCloud && currentHitPosition <= (currentHitPositionCloud + parseFloat(hitBoxCloud.width));
        colliderCloudY = !((parseFloat(window.getComputedStyle(characterDiv).top)) >= (parseFloat(hitBoxCloud.height) + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top))));

    }
    //314.509px


    let didCollideAlien = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionAlien && currentHitPosition <= (currentHitPositionAlien + parseFloat(hitBoxAlien.width));

    if (didCollideAlien && parseFloat(window.getComputedStyle(characterDiv).top) >= 325) {

        close_Gameplay_Screen();
        stop_Moving_Scenarios();
        load_Show_Score_Screen();

    }

    else if (colliderCloudX && colliderCloudY) {
        close_Gameplay_Screen();
        stop_Moving_Scenarios();
        load_Show_Score_Screen();

    }

}

const collitionFunction = () => {


    checkPosition = setInterval(watchMyElement, 1);

}

export { watchMyElement, collitionFunction, checkPosition }

