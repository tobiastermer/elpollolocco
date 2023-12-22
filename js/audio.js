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
    const audioConfig = audios.find((a) => a.audioName === audioName);

    if (audioConfig) {
        if (!audioConfig.audioElement) {
            audioConfig.audioElement = new Audio(audioConfig.src);
            audioConfig.audioElement.loop = audioConfig.loop;
            audioConfig.audioElement.volume = isMuted ? 0.0 : audioConfig.volume;
            audioConfig.audioElement.addEventListener("ended", onAudioEnded);
        }

        if (audioConfig.audioElement.paused || audioConfig.audioElement.ended) {
            if (!audioConfig.isStarting) {
                audioConfig.isStarting = true;
                let playPromise = audioConfig.audioElement.play();

                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        audioConfig.isPlaying = true;
                        audioConfig.isStarting = false;
                    })
                    .catch(error => {
                        audioConfig.isStarting = false;
                        console.error("Error playing audio:", error);
                    });
                }
            }
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
            this.currentTime = 0;
            this.pause();
        });

        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Audio playback started successfully
            })
            .catch(error => {
                // Auto-play was prevented
                console.error("Error playing audio:", error);
            });
        }
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
    const audioConfig = audios.find((a) => a.audioName === audioName);
    if (audioConfig && audioConfig.audioElement && audioConfig.isPlaying) {
        audioConfig.isPlaying = false;
        audioConfig.audioElement.pause();
        audioConfig.audioElement.currentTime = 0;
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
