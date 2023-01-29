import { Howler } from "howler";

const timePlaying = 30000;
// let click = 0;

const music_variables = {
    theme: 0,
    firstTime: true,
    previous_music: null,
    themeInterval: 0,
    themeTimeOut: 0,
    spriteSFX: 0
}

//BUG: When the music is repeated onfade function is stoped


const play_music = (playList) => {

    clearInterval(music_variables.themeInterval);
    let playNext;


    music_variables.theme = new Howl({
        src: [
            (playNext = chooseNextMusic(playList))
        ],
        volume: 0.1
    });

    music_variables.previous_music = playNext;

    music_variables.theme.play();
    music_variables.theme.fade(0, 1, 5000)

    music_variables.themeTimeOut = setTimeout(() => {
        music_variables.theme.fade(1, 0, 5000);
    }, timePlaying - 2500);

    music_variables.themeInterval = setInterval(() => {
        play_music(playList);
    }, timePlaying);

}

//BUG: The music doent load again when we press repeat buttom

const chooseNextMusic = (play_List_Start_Screen) => {

    let playNext = play_List_Start_Screen[Math.floor(Math.random() * play_List_Start_Screen.length)];

    while (music_variables.firstTime === false && music_variables.previous_music === playNext) {
        playNext = play_List_Start_Screen[Math.floor(Math.random() * play_List_Start_Screen.length)];
    }

    music_variables.firstTime = false;
    return playNext;
}

const stop_music = () => {

    // music_variables.theme.fade(1, 0, 2000);
    // setTimeout(() => {
    // music_variables.theme.off("fade");

    music_variables.theme.stop();
    // }, 1000);

    clearTimeout(music_variables.themeTimeOut);
    clearInterval(music_variables.themeInterval);
}

const play_Sound_Sprite = (SFX) => {
    music_variables.spriteSFX = new Howl({
        src: SFX,

    })
    music_variables.spriteSFX.play();

}

export { play_music, stop_music, play_Sound_Sprite }


//BUG: Set Time Out before stoping a music causes a bug between the others