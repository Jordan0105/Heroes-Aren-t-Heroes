
let interval = 0;

function stop_Moving_Scenarios() {
    clearInterval(interval);
}


// window.addEventListener("click", start);

// window.addEventListener("dblclick", stopCarr);

const startMovingScenarios = () => {

    let px = 0, difference = -170;

    const blackHoleLength = document.getElementsByClassName("wormhole").length;
    const carrousselContainer = document.getElementById("carrousselContainer");

    for (let i = 0; i < blackHoleLength; i++) {
        document.getElementsByClassName("wormhole")[i].style.left = difference + "px";
        difference += 1279;
    }

    interval = setInterval(() => {
        px -= 1.4; //0.04
        carrousselContainer.style.left = px + "px";

        if (px <= -9840) {
            px = 0;
        }
    }, 10);

}


export { startMovingScenarios, stop_Moving_Scenarios }