import { useEffect, useRef } from "react";
import { startGame, updateQuestion, handleCanvasClick, stopGame, updateOnAnswerCallback } from "./gameLogic";

export default function CanvasGame({ question, onAnswerChosen, isGameOver }) {
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
    };
  }, []);

  // Effect for updating the question when it changes
  useEffect(() => {
    updateQuestion(question);
  }, [question]);

  // Effect to update the callback function
  useEffect(() => {
    updateOnAnswerCallback(onAnswerChosen);
  }, [onAnswerChosen]);

  // Effect to stop the game
  useEffect(() => {
    if (isGameOver) {
      stopGame();
    }
  }, [isGameOver]);

  return (
    <canvas
      ref={canvasRef}
      width={1500}
      height={570}
      className="game-canvas"
    />
  );
}
