import React from 'react';
import './PauseScreen.css';

/**
 * Affiche un écran de pause superposé au jeu.
 * Ce composant fournit des options pour continuer le jeu ou le quitter.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {Function} props.onResume - La fonction de rappel à exécuter lorsque l'utilisateur clique sur "Continuer".
 * @param {Function} props.onQuit - La fonction de rappel à exécuter lorsque l'utilisateur clique sur "Quitter".
 * @returns {JSX.Element} L'écran de pause.
 */
export default function PauseScreen({ onResume, onQuit }) {
    return (
        <div className="pause-overlay">
            <div className="pause-box">
                <h2 className="pause-title">PAUSE</h2>

                <button className="pause-btn btn-resume" onClick={onResume}>
                    Continuer
                </button>

                <button className="pause-btn btn-quit" onClick={onQuit}>
                    Quitter
                </button>
            </div>
        </div>
    );
}