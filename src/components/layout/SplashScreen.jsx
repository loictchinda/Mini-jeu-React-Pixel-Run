import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const ASSETS_TO_LOAD = [
    '/src/assets/trackt.png',
    '/src/assets/Run_0.png',
    // ... tes autres assets
];

export default function SplashScreen({ onLoaded }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalDuration = 4000; // 4 secondes minimum
        const intervalTime = 50; // Mise à jour toutes les 50ms
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        // 1. Chargement réel des images (en arrière-plan)
        let imagesLoaded = 0;
        ASSETS_TO_LOAD.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => imagesLoaded++;
            img.onerror = () => imagesLoaded++;
        });

        // 2. Timer pour la barre de progression (visuel)
        const timer = setInterval(() => {
            currentStep++;
            const percentage = Math.min(Math.floor((currentStep / steps) * 100), 100);
            setProgress(percentage);

            // Si le temps est écoulé ET que les images sont chargées (ou presque)
            if (currentStep >= steps) {
                clearInterval(timer);
                // On attend une demi-seconde à 100% avant de lancer
                setTimeout(() => {
                    onLoaded();
                }, 500);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onLoaded]);

    return (
        <div className="splash-screen">
            <h1 className="splash-title">QUIZZ RUN</h1>
            <div className="loading-bar-container">
                <div
                    className="loading-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="loading-text">Chargement des ressources... {progress}%</p>
        </div>
    );
}