

let checkPosition = setInterval(watchMyElement, 1);
let hitBoxAlien, hitBoxCharacter, currentHitPosition, currentHitPositionAlien, hitBoxCloud, currentHitPositionCloud;
let cloudDiv;
let cloudCollideY;

function watchMyElement() {


    hitBoxAlien = window.getComputedStyle(alienHitBox);
    hitBoxCharacter = window.getComputedStyle(characterHitBox);
    try {
        hitBoxCloud = window.getComputedStyle(cloudHitBox);
        cloudDiv = window.getComputedStyle(cloudsDiv);
    }
    //314.509px
    catch (e) {
        return;
    }

    currentHitPosition = parseFloat(hitBoxCharacter.left) + parseFloat(window.getComputedStyle(characterDiv).left);
    currentHitPositionAlien = parseFloat(hitBoxAlien.left) + parseFloat(window.getComputedStyle(alienDiv).left);
    currentHitPositionCloud = parseFloat(hitBoxCloud.left) + parseFloat(window.getComputedStyle(cloudsDiv).left);



    let didCollideAlien = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionAlien && currentHitPosition <= (currentHitPositionAlien + parseFloat(hitBoxAlien.width));
    let didCollideCloud = (currentHitPosition + parseFloat(hitBoxCharacter.width)) >= currentHitPositionCloud && currentHitPosition <= (currentHitPositionCloud + parseFloat(hitBoxCloud.width));
    let cloudCollideY = !((parseFloat(window.getComputedStyle(characterDiv).top)) >= (parseFloat(hitBoxCloud.height) + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top))));

    if (didCollideAlien && parseFloat(window.getComputedStyle(characterDiv).top) >= 325) {

        clearInterval(checkPosition);
        clearInterval(startMoving);
        clearInterval(scoreTimer);
        clearInterval(createCloudsInterval);
        clearInterval(cloudInterval1);

        // showScore();

    }
    else if (didCollideCloud && cloudCollideY) {


        // console.log("From top to up hit box " + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top)));
        // console.log("From top to bottom hitbox: " + (parseFloat(hitBoxCloud.height) + (parseFloat(cloudDiv.top) + parseFloat(hitBoxCloud.top))));

        // console.log("Froom top to up hitbox character: " + parseFloat(window.getComputedStyle(characterDiv).top));
        // console.log("From top top to bottom hitbox: " + (parseFloat(window.getComputedStyle(characterDiv).top) + parseFloat(window.getComputedStyle(characterDiv).height)));

        clearInterval(startMoving);
        clearInterval(scoreTimer);
        clearInterval(createCloudsInterval);
        clearInterval(cloudInterval1);
        // showScore();
    }




}



