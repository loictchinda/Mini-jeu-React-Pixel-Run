import React from 'react';
import './MainMenu.css';

export default function MainMenu({ onStartGame }) {
    const categories = [
        {
            id: 'science',
            label: 'Sciences',
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'geography',
            label: 'Géographie',
            image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'history',
            label: 'Histoire',
            image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'general_knowledge',
            label: 'Culture G.',
            image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'sport_and_leisure',
            label: 'Sports',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'music',
            label: 'Musique',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
        },
    ];

    return (
        <div className="main-menu-container">
            <h1 className="game-title">QUIZZ RUN</h1>
            <p className="subtitle">Choisis ta mission :</p>

            <div className="categories-grid">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className="category-card"
                        onClick={() => onStartGame(cat.id)}
                        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${cat.image})` }}
                    >
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}