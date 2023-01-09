
const moveClouds = () => {

    // if (document.getElementById("cloudsDiv").style.left <= "1300") {

    //     document.getElementById("cloudsDiv").style.visibility = "visible";
    // }


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



function createCloudFunction() {

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

        document.getElementById("cloudsDiv").style.top = randomTopCloud() + "px";
        document.getElementById("cloudsDiv").style.left = "1300px";


        cloudInterval1 = setInterval(moveClouds, 10);


    }
}



const createCloudsInterval = setInterval(createCloudFunction, 1000);
