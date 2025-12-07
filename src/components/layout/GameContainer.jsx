import { useEffect, useState } from "react";
import CanvasGame from "../canvas/CanvasGame";
import HUDContainer from "../hud/HudContainer";
import { fetchQuestion } from "../../game/QuizEngine";
import GameOverScreen from "../canvas/GameOverScreen";
import { audioManager } from "../../game/AudioManager"; 
import PauseScreen from "../canvas/PauseScreen";
import { setGamePaused } from "../canvas/gameLogic";

/**
 * Composant principal qui orchestre une session de jeu.
 * Il gère l'état du jeu (score, question, fin de partie, pause),
 * charge les questions, et affiche les écrans appropriés (jeu, pause, game over).
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.category - La catégorie de questions choisie pour la partie.
 * @param {Function} props.onBackToMenu - La fonction de rappel pour retourner au menu principal.
 * @returns {JSX.Element} Le conteneur de jeu.
 */
export default function GameContainer({ category, onBackToMenu }) {
  /** @type {[object | null, Function]} L'état pour la question actuelle. */
  const [question, setQuestion] = useState(null);
  /** @type {[number, Function]} L'état pour le score du joueur. */
  const [score, setScore] = useState(0);
  /** @type {[boolean, Function]} L'état pour indiquer si la partie est terminée. */
  const [isGameOver, setIsGameOver] = useState(false);
  /** @type {[boolean, Function]} L'état pour indiquer si le jeu est en pause. */
  const [isPaused, setIsPaused] = useState(false);

  // Gère la musique de fond : la joue pendant la partie et l'arrête à la fin ou au retour au menu.
  useEffect(() => {
    if (!isGameOver) {
      audioManager.playMusic();
    } else {
      audioManager.stopMusic();
    }

    // Nettoyage : coupe la musique si le composant est démonté (ex: retour au menu).
    return () => {
      audioManager.stopMusic();
    };
  }, [isGameOver]);

  // Charge la première question au démarrage du jeu.
  useEffect(() => {
    async function loadQuestion() {
      const q = await fetchQuestion(category);
      setQuestion(q);
    }
    loadQuestion();
   
  }, []); 

  /**
   * Gère la sélection d'une réponse par le joueur.
   * Si la réponse est correcte, augmente le score et charge une nouvelle question.
   * Si elle est incorrecte, déclenche la fin de la partie.
   * @param {number} index - L'index de l'option de réponse choisie.
   */
  const handleAnswerChosen = (index) => {
    if (isGameOver || !question || isPaused) return;

    if (index === question.correctIndex) {
     
      audioManager.playCorrect();
      
      setScore((prev) => prev + 1);
      fetchQuestion(category).then((q) => setQuestion(q));
    } else {
     
      audioManager.playWrong();
      
      setIsGameOver(true);
    }
  };

  /**
   * Réinitialise l'état du jeu pour commencer une nouvelle partie.
   */
  const handleRestart = () => {
    setIsGameOver(false);
    setGamePaused(false);
    setScore(0);
    setQuestion(null);
    fetchQuestion(category).then((q) => setQuestion(q));
    // La musique redémarrera automatiquement grâce au useEffect qui surveille isGameOver
  };

    /**
     * Met le jeu en pause ou le reprend.
     */
    const togglePause = () => {
        const nouveauStatut = !isPaused;
        setIsPaused(nouveauStatut);    
        setGamePaused(nouveauStatut);   
      };
  
    /**
     * Gère l'action de "Quitter" depuis l'écran de pause pour retourner au menu principal.
     */
    const handleQuit = () => {
        setGamePaused(false); 
        setIsPaused(false);  
        onBackToMenu();
      };

  // Écran de chargement interne
  if (!question && !isGameOver) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        color: 'white',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '20px'
      }}>
        CHARGEMENT...
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {isGameOver ? (
        <GameOverScreen 
            score={score} 
            onRestart={handleRestart} 
            onHome={onBackToMenu} 
        />
      ) : (
        <>
          <CanvasGame
            score={score} 
            question={question}
            onAnswerChosen={handleAnswerChosen}
            isGameOver={isGameOver}
          />
          <HUDContainer
            question={question}
            score={score}
            onAnswerChosen={handleAnswerChosen}
            onTogglePause={togglePause} 
            isPaused={isPaused}
          />

          {isPaused && (
                        <PauseScreen
                          onResume={togglePause}
                          onQuit={handleQuit}
                          />
                      )}
        </>
      )}
    </div>
  );
}
