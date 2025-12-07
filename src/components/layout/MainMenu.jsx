import React from 'react';
import './MainMenu.css';
import cultureIcon from '../../assets/culture.png';
import sigmaIcon from '../../assets/sigma.png';
import geoIcon from '../../assets/geo.png';
import scienceIcon from '../../assets/science.png';
import frenchIcon from '../../assets/french.png';
import natureIcon from '../../assets/nature.png';


/**
 * Affiche le menu principal du jeu où le joueur peut choisir une catégorie de quiz.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {Function} props.onStartGame - La fonction de rappel à exécuter lorsqu'une catégorie est sélectionnée.
 *                                       Elle reçoit l'ID de la catégorie en argument.
 * @returns {JSX.Element} Le composant du menu principal.
 */
export default function MainMenu({ onStartGame }) {
    
    /** @type {Array<object>} La liste des catégories de jeu disponibles. */
    const categories = [
    { id: 'general_knowledge', label: 'Culture G', color: '#3498db', icon: cultureIcon },
    { id: 'mathematics', label: 'Mathématiques', color: '#9b59b6', icon: sigmaIcon },
    { id: 'geography', label: 'Géographie', color: '#aed581', icon: geoIcon },
    { id: 'science', label: 'Sciences', color: '#1abc9c', icon: scienceIcon },
    { id: 'Literature', label: 'Littérature', color: '#eb3773ff', icon: frenchIcon },
    { id: 'nature', label: 'Nature', color: '#f1c40f', icon: natureIcon },
];

   

    return (
        <div className="main-menu-container">
            <h1 className="game-title">CATEGORIES</h1>

            <div className="categories-grid">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className="category-card"
                        onClick={() => onStartGame(cat.id)}
                       
                        style={{ backgroundColor: cat.color }}
                    >
                       
                        <img src={cat.icon} alt={cat.label} className="card-icon" />
                        <span className="card-label">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}