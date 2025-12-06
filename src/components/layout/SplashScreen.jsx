import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const ASSETS_TO_LOAD = [
    '/src/assets/sol1.png',
    '/src/assets/Run_0.png',
   
];

export default function SplashScreen({ onLoaded }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalDuration = 4000; 
        const intervalTime = 50; 
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        //  Chargement réel des images (en arrière-plan)
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

            
            if (currentStep >= steps) {
                clearInterval(timer);
                
                setTimeout(() => {
                    onLoaded();
                }, 500);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onLoaded]);

    return (
        <div className="splash-screen">
            <h1 className="splash-title">QUIZ RUN</h1>
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