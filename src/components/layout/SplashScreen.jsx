import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

/**
 * @const {string[]} ASSETS_TO_LOAD - Liste des chemins des ressources critiques à pré-charger.
 * Ces ressources sont chargées en arrière-plan par le navigateur pendant que l'écran de démarrage est affiché.
 */
const ASSETS_TO_LOAD = [
    '/src/assets/sol1.png',
    '/src/assets/Run_0.png',
   
];

/**
 * Affiche un écran de démarrage (splash screen) avec une barre de progression.
 * Ce composant simule le chargement des ressources pendant une durée fixe
 * tout en lançant le pré-chargement des ressources réelles en arrière-plan.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {Function} props.onLoaded - La fonction de rappel à exécuter une fois la barre de progression terminée.
 * @returns {JSX.Element} Le composant de l'écran de démarrage.
 */
export default function SplashScreen({ onLoaded }) {
    /**
     * @type {[number, Function]}
     * L'état pour suivre la progression (en pourcentage) de la barre de chargement visuelle.
     */
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalDuration = 4000; // Durée totale de l'animation de chargement en ms.
        const intervalTime = 50; // Intervalle de mise à jour de la barre.
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        // 1. Lancement du chargement réel des images en arrière-plan.
        // Cela ne bloque pas l'interface et permet au navigateur de mettre les ressources en cache.
        let imagesLoaded = 0;
        ASSETS_TO_LOAD.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => imagesLoaded++; // On pourrait utiliser ce compteur pour un chargement réel.
            img.onerror = () => imagesLoaded++; // On traite l'erreur comme un "chargement" pour ne pas bloquer.
        });

        // 2. Timer pour la barre de progression (visuel)
        const timer = setInterval(() => {
            currentStep++;
            const percentage = Math.min(Math.floor((currentStep / steps) * 100), 100);
            setProgress(percentage);

            // Lorsque la durée de la simulation est écoulée...
            if (currentStep >= steps) {
                clearInterval(timer);
                // On attend un court instant avant de notifier que le chargement est "terminé".
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