
let cloud_variables = {
    existCloud: false,
    cloudPosition: 1300,
    cloudInterval: 0
}
const moveClouds = () => {

    const cloudsDiv = document.getElementById("cloudsDiv");

    if (cloudsDiv.style.left == "-230px") {
        //Delete elements

        clearInterval(cloud_variables.cloudInterval);

        cloudsDiv.remove();
        cloud_variables.cloudPosition = 1300;
        cloud_variables.existCloud = false;

    }
    else {
        cloud_variables.existCloud = true;
        cloud_variables.cloudPosition -= 3;//1

        cloudsDiv.style.left = cloud_variables.cloudPosition + "px";
    }

}
const create_Cloud_Function = () => {


    if (cloud_variables.existCloud == false) {

        const cloudsDiv = document.createElement("div");
        const hitBoxCloud = document.createElement("div");
        const cloudImg = document.createElement("img");

        cloudsDiv.id = "cloudsDiv";
        hitBoxCloud.id = "cloudHitBox";
        cloudImg.id = "cloudImg";


        document.getElementById("main").appendChild(cloudsDiv);
        cloudsDiv.appendChild(hitBoxCloud);
        cloudsDiv.appendChild(cloudImg);
        // cloudImg.src = require("../../assets/Cloud.png");
        cloudImg.src = "../../assets/Cloud.png";

        cloudImg.alt = "Cloud";

        document.getElementById("cloudsDiv").style.top = random_Top_Cloud() + "px";
        document.getElementById("cloudsDiv").style.left = "1300px";

        cloud_variables.existCloud = true;

        cloud_variables.cloudInterval = setInterval(moveClouds, 10); //10

    }
}
const random_Top_Cloud = () => {

    const heightPx = [70, 100, 120, 50, 65, 80];
    const height = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    return heightPx[height];
}

export { cloud_variables, create_Cloud_Function }