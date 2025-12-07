/** @const {string} Chemin vers le fichier de musique de fond. */
const musicPath = '/src/assets/sounds/music.mp3';
/** @const {string} Chemin vers le fichier audio pour une réponse correcte. */
const correctPath = '/src/assets/sounds/correct.mp3';
/** @const {string} Chemin vers le fichier audio pour une réponse incorrecte. */
const wrongPath = '/src/assets/sounds/wrong.mp3';

/**
 * Gère la lecture de tous les sons et musiques du jeu.
 * Cette classe est conçue pour être utilisée comme un singleton,
 * assurant une seule source de contrôle pour l'audio.
 */
class AudioManager {
    constructor() {
        /** @type {HTMLAudioElement} L'objet audio pour la musique de fond. */
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

    /**
     * Lance la lecture de la musique de fond.
     * Gère les erreurs potentielles si la lecture automatique est bloquée par le navigateur.
     */
    playMusic() {
        // Le catch évite les erreurs si le navigateur bloque l'autoplay
        this.music.play().catch(e => console.log("Audio autoplay bloqué :", e));
    }

    /**
     * Arrête la musique de fond et la remet au début.
     */
    stopMusic() {
        this.music.pause();
        this.music.currentTime = 0; // Remet la musique au début
    }

    /**
     * Joue l'effet sonore pour une réponse correcte.
     * Remet le son au début pour permettre des lectures rapides successives.
     */
    playCorrect() {
        this.correct.currentTime = 0; // Permet de rejouer très vite si on enchaîne
        this.correct.play();
    }

    /**
     * Joue l'effet sonore pour une réponse incorrecte.
     */
    playWrong() {
        this.wrong.currentTime = 0;
        this.wrong.play();
    }
}

/**
 * Instance unique (singleton) de l'AudioManager, exportée pour être utilisée dans toute l'application.
 * @type {AudioManager}
 */
export const audioManager = new AudioManager();