import Score from "./Score";
import Question from "./Question";
import Category from "./Category";
import "./hud.css";
import PauseIcon from "../../assets/Pause circle.svg";

export default function HUDContainer({ question, score, onAnswerChosen,  onTogglePause }) {
  return (
    <div className="hud">
      <Score score={score} />
       
               <button onClick={onTogglePause} className="pause-button"> 
                <img src={PauseIcon} alt="Pause" className="pause-icon-img" /> 
                </button>
      
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
