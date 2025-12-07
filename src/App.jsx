import { useState } from 'react';
import GameContainer from "./components/layout/GameContainer";
import MainMenu from "./components/layout/MainMenu";
import SplashScreen from "./components/layout/SplashScreen"; 
import './App.css';

/**
 * Composant racine de l'application.
 * Il agit comme une machine à états pour gérer le flux global du jeu :
 * 1. `LOADING` -> Affiche le SplashScreen.
 * 2. `MENU` -> Affiche le MainMenu.
 * 3. `PLAYING` -> Affiche le GameContainer.
 * @returns {JSX.Element} Le composant correspondant à l'état actuel de l'application.
 */
function App() {
  /**
   * @type {[string, Function]}
   * Gère l'état actuel de l'application ('LOADING', 'MENU', 'PLAYING') pour déterminer quel composant afficher.
   */
  const [appState, setAppState] = useState('LOADING'); 
  /**
   * @type {[string | null, Function]}
   * Stocke la catégorie de jeu sélectionnée par l'utilisateur dans le menu.
   */
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Passe à l'état 'MENU' une fois que le SplashScreen a terminé son chargement.
   */
  const handleLoadingComplete = () => {
    setAppState('MENU');
  };

  /**
   * Passe à l'état 'PLAYING' et enregistre la catégorie sélectionnée pour démarrer une partie.
   * @param {string} category - L'ID de la catégorie choisie.
   */
  const handleStartGame = (category) => {
    setSelectedCategory(category);
    setAppState('PLAYING');
  };

  /**
   * Retourne à l'état 'MENU' depuis l'écran de jeu ou de fin de partie.
   */
  const handleBackToMenu = () => {
    setAppState('MENU');
    setSelectedCategory(null);
  };

  return (
    <>
      {/* 1. Écran de chargement */}
      {appState === 'LOADING' && (
        <SplashScreen onLoaded={handleLoadingComplete} />
      )}

      { /* 2. Menu Principal */}
      {appState === 'MENU' && (
        <MainMenu onStartGame={handleStartGame} />
      )}

      {/* 3. Jeu */}
      {appState === 'PLAYING' && (
        <GameContainer 
          category={selectedCategory} 
          onBackToMenu={handleBackToMenu} 
        />
      )}
    </>
  );
}

export default App;
