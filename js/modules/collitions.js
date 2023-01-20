import { cloud_variables } from "./clouds.js"
import { close_Gameplay_Screen } from "./gameplay screen.js"
import { load_Show_Score_Screen } from "./game over screen.js";
let checkPosition;

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

    if (cloud_variables.existCloud) {
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

export { watchMyElement, collitionFunction, checkPosition }

