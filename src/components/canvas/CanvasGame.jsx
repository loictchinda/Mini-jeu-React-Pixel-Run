import { useEffect, useRef } from "react";
import { startGame, updateQuestion, handleCanvasClick, stopGame, updateOnAnswerCallback, setGameSpeed } from "./gameLogic";

/**
 * Composant React qui gère le canvas du jeu et son cycle de vie.
 * Il initialise le jeu, gère les mises à jour d'état (question, vitesse) et nettoie les ressources à la fin.
 * @param {object} props - Les propriétés du composant.
 * @param {object} props.question - L'objet de la question actuelle à afficher.
 * @param {Function} props.onAnswerChosen - La fonction de rappel à exécuter lorsqu'une réponse est choisie.
 * @param {boolean} props.isGameOver - Un booléen indiquant si le jeu est terminé.
 * @param {number} props.score - Le score actuel du joueur.
 * @returns {JSX.Element} L'élément canvas du jeu.
 */
export default function CanvasGame({ question, onAnswerChosen, isGameOver, score }) {
  const canvasRef = useRef(null);

  // Initialise le jeu et gère le nettoyage lors du démontage du composant.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    startGame(canvas, ctx, question, onAnswerChosen);

    const clickHandler = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      handleCanvasClick(x, y);
    };

    canvas.addEventListener("click", clickHandler);

    return () => {
      canvas.removeEventListener("click", clickHandler);
      stopGame();
    };

  }, []); // Le tableau de dépendances vide assure que cet effet ne s'exécute qu'une seule fois.

  // Met à jour la vitesse du jeu en fonction de l'évolution du score.
  useEffect(() => {


    const safeScore = (typeof score === 'number' && !isNaN(score)) ? score : 0;
    
    const newSpeed = 4 + Math.floor(score / 2);
   
    const cappedSpeed = Math.min(newSpeed, 12);
    
    setGameSpeed(cappedSpeed);
  }, [score]);

  // Met à jour la question dans la logique du jeu lorsque la prop `question` change.
  useEffect(() => {
    updateQuestion(question);
  }, [question]);

  // Met à jour la fonction de rappel pour la sélection de réponse lorsque la prop `onAnswerChosen` change.
  useEffect(() => {
    updateOnAnswerCallback(onAnswerChosen);
  }, [onAnswerChosen]);

  // Arrête le jeu lorsque la condition de fin de partie (`isGameOver`) est remplie.
  useEffect(() => {
    if (isGameOver) {
      stopGame();
    }
  }, [isGameOver]);

  return (
    <canvas
      ref={canvasRef}
      width={1500}
      height={565}
      className="game-canvas"
    />
  );
}
