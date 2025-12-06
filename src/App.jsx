import { useState } from 'react';
import GameContainer from "./components/layout/GameContainer";
import MainMenu from "./components/layout/MainMenu";
import SplashScreen from "./components/layout/SplashScreen"; // Import du Splash
import './App.css';

function App() {
  // Nouvel état initial : 'LOADING'
  const [appState, setAppState] = useState('LOADING'); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Appelée quand le chargement est fini
  const handleLoadingComplete = () => {
    setAppState('MENU');
  };

  const handleStartGame = (category) => {
    setSelectedCategory(category);
    setAppState('PLAYING');
  };

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

      {/* 2. Menu Principal */}
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
