import Score from "./Score";
import Question from "./Question";
import Category from "./Category";
import "./hud.css";

export default function HUDContainer({ question, score, onAnswerChosen,  onTogglePause }) {
  return (
    <div className="hud">
      <Score score={score} />
        {/* 👇 LE BOUTON PAUSE */}
                <button
                    onClick={onTogglePause}
                    style={{
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: '#f1c40f', 
                        color: '#2c3e50',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px #d35400',
                        fontFamily: 'inherit'
                    }}
                >
                    ⏸️ PAUSE
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
