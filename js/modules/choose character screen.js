import { close_Home_Screen, load_Gameplay_Screen_Event } from "./agreggator.js"
import { play_music, stop_music, play_Sound_Sprite } from "./agreggator.js";

let opacityAuraSetinterval = 0, opacity = 0;
let characterImgSrc = "", firstTime = true;

const load_Choose_Character_Screen_Event = (event) => {

    const allowedKeys = /^(Space|Enter|Backspace)$/;

    if (allowedKeys.test(event.code)) {

        play_Sound_Sprite("../../assets/Audio/SFX Audio/Select Character SFX.mp3");

        window.removeEventListener("keydown", load_Choose_Character_Screen_Event);
        close_Home_Screen();

        //Load the select character screen
        setTimeout(() => {
            load_Choose_Character_Screen();
        }, 1200);
    }

}

const show_Aura_Event = () => {

    let parent = document.getElementById("characterContainer");

    let clickedElement = event.target;

    let i = Array.from(parent.children).indexOf(clickedElement);

    const aura = document.getElementById("aura");
    clearInterval(opacityAuraSetinterval);
    opacity = 0;
    aura.style.opacity = opacity;

    opacityAuraSetinterval = setInterval(() => {

        aura.style.opacity = opacity;

        if (aura.style.opacity <= 0.6) {
            opacity = opacity + 0.05;
            aura.style.opacity = opacity;
        }
        else {
            clearInterval(opacityAuraSetinterval);
            opacity = 0;

        }



    }, 100);

    switch (i) {

        case 0:
            aura.style.top = "-12px";
            aura.style.left = "56px";
            break;

        case 1:
            aura.style.top = "-12px";
            aura.style.left = "488px";
            break;

        case 2:
            aura.style.top = "-12px";
            aura.style.left = "918px";
            break;

        //Characters 2nd row

        case 3:
            aura.style.top = "255px";
            aura.style.left = "56px";
            break;

        case 4:
            aura.style.top = "255px";
            aura.style.left = "494px";
            break;

        case 5:
            aura.style.top = "255px";
            aura.style.left = "922px";
            break;
    }
}

const disappear_Aura_Event = () => {

    const aura = document.getElementById("aura");
    clearInterval(opacityAuraSetinterval);
    aura.style.opacity = 0;

}

const clicked_Icon_Event = (i) => {

    play_Sound_Sprite("../../assets/Audio/SFX Audio/Click SFX.mp3");
    const selectedImageIcon = document.getElementById("selectedImageIcon");
    selectedImageIcon.style.display = "block";

    characterImgSrc = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild.src;

    switch (i) {

        case 0:
            selectedImageIcon.style.top = "0px";
            selectedImageIcon.style.left = "347px";
            break;
        case 1:
            selectedImageIcon.style.top = "0px";
            selectedImageIcon.style.left = "768px";
            break;
        case 2:
            selectedImageIcon.style.top = "0px";
            selectedImageIcon.style.left = "1187px";
            break;

        //Characters 2nd row

        case 3:
            selectedImageIcon.style.top = "269px";
            selectedImageIcon.style.left = "347px";
            break;

        case 4:
            selectedImageIcon.style.top = "269px";
            selectedImageIcon.style.left = "768px";
            break;

        case 5:
            selectedImageIcon.style.top = "269px";
            selectedImageIcon.style.left = "1187px";
            break;
    }
    document.getElementById("chooseCharacterText").innerHTML = "Press Any Key To Continue";
    window.addEventListener("keydown", load_Gameplay_Screen_Event);
}

const load_Choose_Character_Screen = () => {

    const play_List_Choose_Character = [

        "../../assets/Audio/Character Screen/Character Select Super Mario Bros Theme.mp3",
        "../../assets/Audio/Character Screen/Crash Bandicoot Theme.mp3",
        "../../assets/Audio/Character Screen/Super Smash Bros Brawl Theme.mp3"

    ];
    play_music(play_List_Choose_Character);

    document.getElementById("chooseCharacter").style.display = "flex";
    // document.getElementById("chooseCharacter").style.cursor = `url("${require("../../assets/Icons/Selected_Icon.png")}"), auto`;
    document.getElementById("chooseCharacter").style.cursor = `url("../../assets/Icons/Selected_Icon.png"), auto`;


    if (firstTime) {
        document.getElementById("chooseCharacter").classList.add("animate__animated", "animate__slideInDown");
        firstTime = false;

    }
    else {
        for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {
            document.getElementsByClassName("characterBoxSpace")[i].classList.add("animate__animated", "animate__zoomIn");
        }
    }

    for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {
        document.getElementsByClassName("characterBoxSpace")[i].firstElementChild.classList.add("animate__animated", "animate__tada");
    }

    setTimeout(() => {


        for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {

            document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseenter", show_Aura_Event);
            document.getElementsByClassName("characterBoxSpace")[i].addEventListener("mouseleave", disappear_Aura_Event)
            document.getElementsByClassName("characterBoxSpace")[i].addEventListener("click", () => clicked_Icon_Event(i));

        }
    }, 1000);


}

const close_Choose_Character_Screen = () => {

    stop_music();

    document.getElementById("chooseCharacter").className = "";
    document.getElementById("chooseCharacter").style.animation = "slideInDownAnimation 0.8s ease-in-out";
    //Delete the event listeners

    for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {
        document.getElementsByClassName("characterBoxSpace")[i].className = "characterBoxSpace";

        let element = document.getElementsByClassName("characterBoxSpace")[i];
        let elementImage = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild;
        elementImage.className = "";

        let clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
    }

    setTimeout(() => {

        opacity = 0;
        document.getElementById("aura").style.opacity = opacity;
        document.getElementById("chooseCharacter").style.display = "none";

    }, 800);
}

export { load_Choose_Character_Screen_Event, show_Aura_Event, disappear_Aura_Event }
export { clicked_Icon_Event, load_Choose_Character_Screen, close_Choose_Character_Screen, characterImgSrc };