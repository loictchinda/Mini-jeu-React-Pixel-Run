import Score from "./Score";
import Question from "./Question";
import Category from "./Category";
import "./hud.css";
import PauseIcon from "../../assets/Pause circle.svg";

/**
 * Affiche le Heads-Up Display (HUD) du jeu.
 * Ce conteneur regroupe les informations essentielles comme le score, la question actuelle,
 * la catégorie et un bouton pour mettre le jeu en pause.
 * @param {object} props - Les propriétés du composant.
 * @param {object | null} props.question - L'objet de la question actuelle. Contient la catégorie et le texte de la question.
 * @param {number} props.score - Le score actuel du joueur.
 * @param {Function} props.onTogglePause - La fonction de rappel à exécuter lorsque l'utilisateur clique sur le bouton de pause.
 * @returns {JSX.Element} Le conteneur du HUD.
 */
export default function HUDContainer({ question, score, onTogglePause }) {
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
