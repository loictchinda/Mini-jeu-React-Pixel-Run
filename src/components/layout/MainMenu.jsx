import React from 'react';
import './MainMenu.css';

export default function MainMenu({ onStartGame }) {
    // On définit les couleurs spécifiques de la maquette ici
    const categories = [
        { id: 'general_knowledge', label: 'Culture G', color: '#3498db' }, // Bleu
        { id: 'mathematics', label: 'Mathématiques', color: '#9b59b6' }, // Violet
        { id: 'geography', label: 'Géographie', color: '#aed581' }, // Vert clair
        { id: 'science', label: 'Sciences', color: '#1abc9c' }, // Turquoise
        { id: 'books', label: 'Français', color: '#e91e63' }, // Rose
        { id: 'nature', label: 'Nature', color: '#f1c40f' }, // Jaune
    ];

    // Note : Pour l'instant, je n'ai pas mis les icônes (ampoule, atome...) car il faudrait des fichiers SVG.
    // On se concentre sur les couleurs et la forme des cartes.

    return (
        <div className="main-menu-container">
            <h1 className="game-title">CATEGORIES</h1>

            <div className="categories-grid">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className="category-card"
                        onClick={() => onStartGame(cat.id)}
                        // On applique la couleur directement ici
                        style={{ backgroundColor: cat.color }}
                    >
                        {/* Espace pour une future icône */}
                        <div className="card-icon-placeholder"></div>
                        <span className="card-label">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}