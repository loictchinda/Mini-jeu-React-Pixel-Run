import React from 'react';
import './PauseScreen.css';

export default function PauseScreen({ onResume, onQuit }) {
    return (
        <div className="pause-overlay">
            <div className="pause-box">
                <h2 className="pause-title">Votre jeu est en pause</h2>

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