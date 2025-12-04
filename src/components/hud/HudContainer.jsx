import Score from "./Score";
import Question from "./Question";
import Category from "./Category";
import "./hud.css";

export default function HUDContainer({ question, score, onAnswerChosen }) {
  return (
    <div className="hud">
      <Score score={score} />
      
      {question ? (
                <>
                  <Category text={question.category } />
                  <Question text={question.question} />
                </>
               ) : (
                 <p>Loading question...</p>
            )
       }

    </div>
  );
}
