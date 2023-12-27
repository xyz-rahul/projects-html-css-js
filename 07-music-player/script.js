const pause_play_button = document.getElementById("pause_play_button");
const prev_button = document.getElementById("prev_button");
const next_button = document.getElementById("next_button");
const icon = document.getElementById("icon");
const nameElement = document.getElementById("name");

let songs = [
    {
        name: "Sugar",
        title: "sugar & Brownies",
        artist: "Dharia",
    },
    {
        name: "Peaches",
        title: "Peaches",
        artist: "Justin Bieber",
    },
    {
        name: "Alone",
        title: "Alone",
        artist: "Alan Walker",
    },
];

let playing = false;
let songIndex = 0;
let song = songs[0];

let audio;
const loadAudio = () => {
    const name = song.name;
    try {
        audio = new Audio(`songs/${name}.mp3`);
    } catch (error) {
        console.error("Error loading audio:", error);
    }
};

const setNameAndIcon = () => {
    const name = song.name;

    try {
        icon.style.background = `no-repeat center/80% url("images/${name}.jpg")`;
        nameElement.innerText = name;
    } catch (error) {
        console.error("Error setting icon:", error);
    }
};

const startPlaying = () => {
    try {
        pause_play_button.style.background = `no-repeat center/80% url("assets/pause_button.svg")`;
        setNameAndIcon();
        playing = true;
        if (audio) audio.pause();

        loadAudio();
        audio.play();
    } catch (error) {
        console.error("Error starting playback:", error);
    }
};

const stopPlaying = () => {
    try {
        pause_play_button.style.background = `no-repeat center/80% url("assets/play_button.svg")`;
        playing = false;
        audio.pause();
    } catch (error) {
        console.error("Error stopping playback:", error);
    }
};

const playNextSong = () => {
    try {
        songIndex = ((songIndex - 1) % songs.length + songs.length) % songs.length;
        song = songs[songIndex];
        startPlaying();
    } catch (error) {
        console.error("Error playing next song:", error);
    }
};

const playPrevSong = () => {
    try {
        songIndex = ((songIndex + 1) % songs.length + songs.length) % songs.length;
        song = songs[songIndex];
        startPlaying();
    } catch (error) {
        console.error("Error playing previous song:", error);
    }
};

pause_play_button.addEventListener("click", () => {
    if (playing) {
        stopPlaying();
    } else {
        startPlaying();
    }
});

prev_button.addEventListener("click", () => {
    playNextSong();
});

next_button.addEventListener("click", () => {
    playPrevSong();
});

// one time call on dom load
try {
    setNameAndIcon();
    loadAudio();
} catch (error) {
    console.error("Error setting initial icon:", error);
}

