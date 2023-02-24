
let interval = 0;

function stop_Moving_Scenarios() {
    clearInterval(interval);
}

const startMovingScenarios = () => {

    let px = 0, difference = -170;

    //* Background images elements

    const blackHoleLength = document.getElementsByClassName("wormhole").length;
    const carrousselContainer = document.getElementById("carrousselContainer");

    //* Black Holes position (between 2 scenarios)

    for (let i = 0; i < blackHoleLength; i++) {
        document.getElementsByClassName("wormhole")[i].style.left = difference + "px";
        difference += 1279;
    }

    //* Move the scenarios

    interval = setInterval(() => {
        px -= 1.4;
        carrousselContainer.style.left = px + "px";

        //* If we reach the last scenario we get back to the first scenario

        if (px <= -9840) {
            px = 0;
        }
    }, 10);

}


export { startMovingScenarios, stop_Moving_Scenarios }