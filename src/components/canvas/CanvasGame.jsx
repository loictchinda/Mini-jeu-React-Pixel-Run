import { useEffect, useRef } from "react";
import { startGame, updateQuestion, handleCanvasClick, stopGame, updateOnAnswerCallback, setGameSpeed } from "./gameLogic";

export default function CanvasGame({ question, onAnswerChosen, isGameOver, score }) {
  const canvasRef = useRef(null);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gestion de la vitesse basée sur le score
  useEffect(() => {
    // Vitesse de base 4, +1 tous les 2 points
    const newSpeed = 4 + Math.floor(score / 2);
    // On plafonne à 12 pour que ça reste jouable
    const cappedSpeed = Math.min(newSpeed, 12);
    
    setGameSpeed(cappedSpeed);
  }, [score]);

  useEffect(() => {
    updateQuestion(question);
  }, [question]);

  useEffect(() => {
    updateOnAnswerCallback(onAnswerChosen);
  }, [onAnswerChosen]);

  useEffect(() => {
    if (isGameOver) {
      stopGame();
    }
  }, [isGameOver]);

  return (
    <canvas
      ref={canvasRef}
      width={1250}
      height={500}
      className="game-canvas"
    />
  );
}