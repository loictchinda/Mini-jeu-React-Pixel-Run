import { useEffect, useState } from "react";
import CanvasGame from "../canvas/CanvasGame";
import HUDContainer from "../hud/HudContainer";
import { fetchQuestion } from "../../game/QuizEngine";

export default function GameContainer() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function loadQuestion() {
      const q = await fetchQuestion();
      setQuestion(q);
    }

    loadQuestion();
  }, []);

  const handleAnswerChosen = (index) => {
    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
    // Charger la prochaine question
    fetchQuestion().then((q) => setQuestion(q));
  };

  return (
    <div style={{ position: "relative" }}>
      <CanvasGame />
      <HUDContainer
        question={question}
        score={score}
        onAnswerChosen={handleAnswerChosen}
      />
    </div>
  );
}
