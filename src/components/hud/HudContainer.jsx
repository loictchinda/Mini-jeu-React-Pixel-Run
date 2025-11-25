import Score from "./Score";
import Question from "./Question";
import Answers from "./Answers";
import "./hud.css";

export default function HUDContainer({ question, score, onAnswerChosen }) {
  return (
    <div className="hud">
      <Score score={score} />
      
      {question ? (
                <>
                  <Question text={question.question} />
                   <Answers options={question.options} />
                </>
               ) : (
                 <p>Loading question...</p>
            )
       }

    </div>
  );
}
