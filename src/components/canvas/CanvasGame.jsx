import { useEffect, useRef } from "react";
import { startGame } from "./gameLogic";

export default function CanvasGame() {
    
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    startGame(canvas, ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1250}
      height={500}
      className="game-canvas"
    />
  );
}
