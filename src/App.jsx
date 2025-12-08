import { useState } from 'react';
import GameContainer from "./components/layout/GameContainer";
import MainMenu from "./components/layout/MainMenu";
import SplashScreen from "./components/layout/SplashScreen"; 
import { GameSettingsContext } from './context/GameSettingsContext'; // <--- IMPORT
import './App.css';

function App() {
  const [appState, setAppState] = useState('LOADING'); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- AJOUT : Paramètres globaux (Consigne useContext) ---
  const globalSettings = {
    gameTitle: "QUIZ RUN",
    version: "1.0",
    themeColor: "#1a1a40" // Couleur de fond globale
  };

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
    // --- AJOUT : On enveloppe l'app avec le Provider ---
    <GameSettingsContext.Provider value={globalSettings}>
      <>
        {appState === 'LOADING' && (
          <SplashScreen onLoaded={handleLoadingComplete} />
        )}

        {appState === 'MENU' && (
          <MainMenu onStartGame={handleStartGame} />
        )}

        {appState === 'PLAYING' && (
          <GameContainer 
            category={selectedCategory} 
            onBackToMenu={handleBackToMenu} 
          />
        )}
      </>
    </GameSettingsContext.Provider>
  );
}

export default App;