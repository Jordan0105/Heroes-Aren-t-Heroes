// import { Howl, Howler } from "howler";
const audioFile = require('../../assets/Audio/Start Screen/Flower Garden Theme.mp3');

const playTheme = () => {

    // const audio = new Audio("../../assets/Audio/Start Screen/Flower Garden Theme.mp3");
    // audio.play();

    // var audio = document.createElement('audio');
    // audio.src = '../../assets/Audio/Start Screen/Flower Garden Theme.mp3';
    // audio.play();
    // const theme = new Howl({
    //     src: ["../../assets/Audio/Start Screen/Flower Garden Theme.mp3"]
    // });
    // theme.play();
    // console.log("playing");
    const audio = new Audio(audioFile);
    audio.play();
}

export { playTheme }