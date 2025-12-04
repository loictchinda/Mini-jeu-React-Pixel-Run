import { useEffect, useState } from "react";
import CanvasGame from "../canvas/CanvasGame";
import HUDContainer from "../hud/HudContainer";
import { fetchQuestion } from "../../game/QuizEngine";
import GameOverScreen from "../canvas/GameOverScreen";

export default function GameContainer() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    async function loadQuestion() {
      const q = await fetchQuestion();
      setQuestion(q);
    }

    loadQuestion();
  }, []);

  const handleAnswerChosen = (index) => {
    if (isGameOver || !question) return;

    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
     
      fetchQuestion().then((q) => setQuestion(q));
    } else {
     
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    fetchQuestion().then((q) => setQuestion(q));
  };

  return (
    <div style={{ position: "relative" }}>
      {isGameOver ? (
        <GameOverScreen score={score} onRestart={handleRestart} />
      ) : (
        <>
          <CanvasGame
            question={question}
            onAnswerChosen={handleAnswerChosen}
            isGameOver={isGameOver}
          />
          <HUDContainer
            question={question}
            score={score}
            onAnswerChosen={handleAnswerChosen}
          />
        </>
      )}
    </div>
  );
}
