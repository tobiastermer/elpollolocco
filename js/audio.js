/**
 * Array containing audio configurations.
 * @type {AudioConfig[]}
 */
let audios = [
    {
        audioName: "backgroundMusic",
        src: "audio/backgroundmusic.mp3",
        loop: true,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterWalking",
        src: "audio/characterWalking.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterDies",
        src: "audio/characterDies.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterGetHurt",
        src: "audio/characterGetHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterJump",
        src: "audio/characterJump.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "characterSleeps",
        src: "audio/characterSleeps.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "collectCoin",
        src: "audio/collectCoin.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleThrow",
        src: "audio/bottleThrow.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleSplash",
        src: "audio/bottleSplash.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "bottleCollect",
        src: "audio/bottleCollect.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossDies",
        src: "audio/endbossDies.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossHurt",
        src: "audio/endbossHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossAttak",
        src: "audio/endbossAttak.mp3",
        loop: true,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "endbossAlert",
        src: "audio/endbossAlert.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "chickenHit",
        src: "audio/chickenHit.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "smallChickenHit",
        src: "audio/smallChickenHit.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "gameLost",
        src: "audio/gameLost.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
    {
        audioName: "gameWon",
        src: "audio/gameWon.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false,
    },
];

/**
 * Plays the specified audio.
 * @param {string} audioName - The name of the audio to play.
 */
let isMuted = false;

function playAudio(audioName) {
    const audio = audios.find((a) => a.audioName === audioName);

    if (audio && !audio.isPlaying) {
        if (!audio.audioElement || audio.audioElement.paused || audio.audioElement.ended) {
            if (audio.audioElement) {
                audio.audioElement.pause();
                audio.audioElement.currentTime = 0;
            } else {
                audio.audioElement = new Audio(audio.src);
                audio.audioElement.loop = audio.loop;
            }
            audio.audioElement.volume = isMuted ? 0.0 : audio.volume;
            audio.audioElement.removeEventListener("ended", onAudioEnded);
            audio.audioElement.addEventListener("ended", onAudioEnded);
            audio.audioElement.play().catch(e => {
                console.error("Error playing audio:", e);
            });
        }
    }
}

/**
 * Plays the specified audio multiple times simultaneously.
 * @param {string} audioName - The name of the audio to play.
 */
function playAudioMultiple(audioName) {
    const audioConfig = audios.find((a) => a.audioName === audioName);
    if (audioConfig) {
        const audio = new Audio(audioConfig.src);
        audio.loop = audioConfig.loop;
        audio.volume = isMuted ? 0.0 : audioConfig.volume;
        audio.addEventListener("ended", function () {
            setTimeout(() => {
                this.currentTime = 0;
                this.pause();
            }, 100);
        });

        // Spielen Sie das Audio ab und fangen Sie mögliche Fehler ab
        audio.play().catch(e => {
            console.error("Error playing audio:", e);
        });
    }
}

/**
 * Resets the audio playback to the start and pauses it.
 */
function onAudioEnded() {
    setTimeout(() => {
        this.currentTime = 0;
        this.pause();
    }, 100);
}

/**
 * Pauses the specified audio and resets its playback to the start.
 * @param {string} audioName - The name of the audio to pause.
 */
function pauseAudio(audioName) {
    const audio = audios.find((a) => a.audioName === audioName);
    if (audio && audio.audioElement) {
        setTimeout(() => {
            audio.audioElement.pause();
            audio.audioElement.currentTime = 0;
        }, 100);
    }
}

/**
 * Returns an audio object by its name.
 * @param {string} audioName - The name of the audio.
 * @returns {Object} The audio object.
 */
function getAudioByName(audioName) {
    return audios.find((a) => a.audioName === audioName);
}

/**
 * Mutes an audio object.
 * @param {Object} audio - The audio object to mute.
 */
function muteAudio(audio) {
    if (audio && audio.audioElement) {
        audio.audioElement.volume = 0.0;
    }
}

/**
 * Unmutes an audio object.
 * @param {Object} audio - The audio object to unmute.
 */
function unmuteAudio(audio) {
    if (audio && audio.audioElement) {
        audio.audioElement.volume = 0.4;
    }
}

/**
 * Toggles the music on and off.
 */
function toggleMusic() {
    let musicButton = document.getElementById("btn-music");
    const backgroundAudio = getAudioByName("backgroundMusic");
    if (backgroundAudio.isPlaying) {
        pauseAudio("backgroundMusic");
        backgroundAudio.isPlaying = false;
        musicButton.src = "img/10_buttons/soundoff.svg";
        audios.forEach(muteAudio);
        isMuted = true;
    } else {
        playAudio("backgroundMusic");
        backgroundAudio.isPlaying = true;
        musicButton.src = "img/10_buttons/soundon.svg";
        audios.forEach(unmuteAudio);
        isMuted = false;
    }
}
