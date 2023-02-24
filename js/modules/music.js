import { Howler, Howl } from "howler";

//* Time per background sound

const timePlaying = 30000;

const music_variables = {
    theme: 0,
    firstTime: true,
    previous_music: null,
    themeInterval: 0,
    themeTimeOut: 0,
    spriteSFX: 0
}


const play_music = (playList) => {

    clearInterval(music_variables.themeInterval);
    let playNext;

    //* Howl object to play music

    music_variables.theme = new Howl({
        src: [
            (playNext = chooseNextMusic(playList))
        ],
    });

    //* We save the currently music to the previous variable so it can not choosen again

    music_variables.previous_music = playNext;

    music_variables.theme.play();
    music_variables.theme.fade(0, 1, 5000)

    //* Smooth transitions between songs

    music_variables.themeTimeOut = setTimeout(() => {
        music_variables.theme.fade(1, 0, 5000);
    }, timePlaying - 2500);

    music_variables.themeInterval = setInterval(() => {
        play_music(playList);
    }, timePlaying);

}
const chooseNextMusic = (play_List_Start_Screen) => {

    //* Choose a random music of the play list

    let playNext = play_List_Start_Screen[Math.floor(Math.random() * play_List_Start_Screen.length)];

    //* If the same music is chosen, it is chosen again (don't play the same)

    while (music_variables.firstTime === false && music_variables.previous_music === playNext) {
        playNext = play_List_Start_Screen[Math.floor(Math.random() * play_List_Start_Screen.length)];
    }

    music_variables.firstTime = false;
    return playNext;
}

const stop_music = () => {
    music_variables.theme.stop();
    clearTimeout(music_variables.themeTimeOut);
    clearInterval(music_variables.themeInterval);
}

//* Play a sprite (a short sound)

const play_Sound_Sprite = (SFX) => {
    music_variables.spriteSFX = new Howl({
        src: SFX,
        volume: 1
    })
    music_variables.spriteSFX.play();

}

export { play_music, stop_music, play_Sound_Sprite }

