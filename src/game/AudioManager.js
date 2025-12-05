// On définit les chemins des fichiers
// Assure-toi que les noms correspondent exactement à tes fichiers dans src/assets/sounds/
const musicPath = '/src/assets/sounds/music.mp3';
const correctPath = '/src/assets/sounds/correct.mp3';
const wrongPath = '/src/assets/sounds/wrong.mp3';

class AudioManager {
    constructor() {
        this.music = new Audio(musicPath);
        this.correct = new Audio(correctPath);
        this.wrong = new Audio(wrongPath);

        // Configuration de la musique
        this.music.loop = true; // La musique tourne en boucle
        this.music.volume = 0.4; // Volume à 40% pour ne pas couvrir les bruitages

        // Volume des bruitages
        this.correct.volume = 0.8;
        this.wrong.volume = 0.8;
    }

    playMusic() {
        // Le catch évite les erreurs si le navigateur bloque l'autoplay
        this.music.play().catch(e => console.log("Audio autoplay bloqué :", e));
    }

    stopMusic() {
        this.music.pause();
        this.music.currentTime = 0; // Remet la musique au début
    }

    playCorrect() {
        this.correct.currentTime = 0; // Permet de rejouer très vite si on enchaîne
        this.correct.play();
    }

    playWrong() {
        this.wrong.currentTime = 0;
        this.wrong.play();
    }
}

// On exporte une instance unique (Singleton) pour l'utiliser partout
export const audioManager = new AudioManager();