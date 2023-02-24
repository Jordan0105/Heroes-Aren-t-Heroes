import { close_Home_Screen, load_Gameplay_Screen_Event } from "./agreggator.js"
import { play_music, stop_music, play_Sound_Sprite } from "./agreggator.js";

let opacityAuraSetinterval = 0, opacity = 0;
let characterImgSrc = "", firstTime = true;

const load_Choose_Character_Screen_Event = (event) => {

    //* RegExp to filter when a user hit only Space, Enter or Backspace

    const allowedKeys = /^(Space|Enter|Backspace)$/;

    //* If the user pressed those keys

    if (allowedKeys.test(event.code)) {

        play_Sound_Sprite("../../assets/Audio/SFX Audio/Select Character SFX.mp3");

        window.removeEventListener("keydown", load_Choose_Character_Screen_Event);
        close_Home_Screen();

        //* Load the select character screen
        setTimeout(() => {
            load_Choose_Character_Screen();
        }, 1200);
    }

}

//* When the user hovers over a character, there is an aura that lights up behind it

const show_Aura_Event = () => {

    let parent = document.getElementById("characterContainer");

    let clickedElement = event.target;

    //* Get the position of the current aura converting the DOM Node to an Array and then
    //* getting the index of the clicked element

    let positionAura = Array.from(parent.children).indexOf(clickedElement);

    const aura = document.getElementById("aura");
    clearInterval(opacityAuraSetinterval);

    opacity = 0;
    aura.style.opacity = opacity;

    //* Interval used to glow up or dim the aura

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

    //* The psoition of the auar for every character box

    switch (positionAura) {

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

        //* Characters 2nd row

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

    //* Get the character(image) clicked

    characterImgSrc = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild.src;

    //* This is the icon that appears when selecting a character in the upper left corner
    switch (i) {

        case 0:
            selectedImageIcon.style.top = "0px";
            selectedImageIcon.style.left = "347px";
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Character Voice/Captain America Voice.mp3");
            break;
        case 1:
            selectedImageIcon.style.top = "0px";
            selectedImageIcon.style.left = "768px";
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Character Voice/Loki Voice.mp3");

            break;
        case 2:
            selectedImageIcon.style.top = "0px";
            selectedImageIcon.style.left = "1187px";
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Character Voice/Doctor Strange Voice.mp3");

            break;

        //* Characters on the 2nd row

        case 3:
            selectedImageIcon.style.top = "269px";
            selectedImageIcon.style.left = "347px";
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Character Voice/Spider-Man Voice.mp3");

            break;

        case 4:
            selectedImageIcon.style.top = "269px";
            selectedImageIcon.style.left = "768px";
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Character Voice/Flash Voice.mp3");

            break;

        case 5:
            selectedImageIcon.style.top = "269px";
            selectedImageIcon.style.left = "1187px";
            play_Sound_Sprite("../../assets/Audio/SFX Audio/Character Voice/iron Man Voice.mp3");

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
    document.getElementById("chooseCharacter").style.cursor = `url("../../assets/Icons/Selected_Icon.png"), auto`;

    //* If is the first time then the Choose Character screen will have an animation 

    if (firstTime) {
        document.getElementById("chooseCharacter").classList.add("animate__animated", "animate__slideInDown");
        firstTime = false;

    }
    else {

        //* Box Character Space Animations

        for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {
            document.getElementsByClassName("characterBoxSpace")[i].classList.add("animate__animated", "animate__zoomIn");
        }
    }

    //* Animation when the characters appears

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

    //* Delete the animations when we close the character screen

    for (let i = 0; i < document.getElementsByClassName("characterBoxSpace").length; i++) {
        document.getElementsByClassName("characterBoxSpace")[i].className = "characterBoxSpace";

        let element = document.getElementsByClassName("characterBoxSpace")[i];
        let elementImage = document.getElementsByClassName("characterBoxSpace")[i].firstElementChild;
        elementImage.className = "";

        //* Clone those elements to delete event listeners at once

        let clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
    }

    //* Timeout to vanish the aura when we close the screen

    setTimeout(() => {

        opacity = 0;
        document.getElementById("aura").style.opacity = opacity;
        document.getElementById("chooseCharacter").style.display = "none";

    }, 800);
}

export { load_Choose_Character_Screen_Event, show_Aura_Event, disappear_Aura_Event }
export { clicked_Icon_Event, load_Choose_Character_Screen, close_Choose_Character_Screen, characterImgSrc };