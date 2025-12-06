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
<<<<<<< HEAD
    };
  }, []);

  // Effect for updating the question when it changes
=======
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

>>>>>>> 9ee8332f52748e6ca1d9420cc50c9548a4593792
  useEffect(() => {
    updateQuestion(question);
  }, [question]);

<<<<<<< HEAD
  // Effect to update the callback function
=======
>>>>>>> 9ee8332f52748e6ca1d9420cc50c9548a4593792
  useEffect(() => {
    updateOnAnswerCallback(onAnswerChosen);
  }, [onAnswerChosen]);

<<<<<<< HEAD
  // Effect to stop the game
=======
>>>>>>> 9ee8332f52748e6ca1d9420cc50c9548a4593792
  useEffect(() => {
    if (isGameOver) {
      stopGame();
    }
  }, [isGameOver]);

  return (
    <canvas
      ref={canvasRef}
<<<<<<< HEAD
      width={1500}
      height={570}
      className="game-canvas"
    />
  );
}
=======
      width={1250}
      height={500}
      className="game-canvas"
    />
  );
}
>>>>>>> 9ee8332f52748e6ca1d9420cc50c9548a4593792
