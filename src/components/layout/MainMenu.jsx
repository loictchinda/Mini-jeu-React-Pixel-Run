import React, { useContext, useMemo } from 'react'; // <--- IMPORTS AJOUTÉS
import './MainMenu.css';
import cultureIcon from '../../assets/culture.png';
import sigmaIcon from '../../assets/sigma.png';
import geoIcon from '../../assets/geo.png';
import scienceIcon from '../../assets/science.png';
import frenchIcon from '../../assets/french.png';
import natureIcon from '../../assets/nature.png';
import { GameSettingsContext } from '../../context/GameSettingsContext'; // <--- IMPORT CONTEXT

export default function MainMenu({ onStartGame }) {
    
    // 1. UTILISATION DE USECONTEXT (Récupération des paramètres globaux)
    const { gameTitle } = useContext(GameSettingsContext);

    // 2. UTILISATION DE USEMEMO (Optimisation de la liste)
    // Consigne : "optimiser la génération des obstacles/éléments"
    // Ici, on empêche la ré-allocation du tableau 'categories' à chaque render.
    const categories = useMemo(() => [
        { id: 'general_knowledge', label: 'Culture G', color: '#3498db', icon: cultureIcon },
        { id: 'mathematics', label: 'Mathématiques', color: '#9b59b6', icon: sigmaIcon },
        { id: 'geography', label: 'Géographie', color: '#aed581', icon: geoIcon },
        { id: 'science', label: 'Sciences', color: '#1abc9c', icon: scienceIcon },
        { id: 'Literature', label: 'Littérature', color: '#eb3773ff', icon: frenchIcon },
        { id: 'nature', label: 'Nature', color: '#f1c40f', icon: natureIcon },
    ], []); // Le tableau vide [] signifie : "Calculer une seule fois au démarrage"

    return (
        <div className="main-menu-container">
            {/* On utilise le titre venant du Context */}
            <h1 className="game-title">{gameTitle}</h1>

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