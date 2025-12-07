/**
 * @file Fichier d'entrée principal de l'application React.
 * Ce fichier est responsable de l'initialisation de l'application. Il sélectionne l'élément DOM
 * racine (`#root`) et y rend le composant principal `App`.
 * L'application est enveloppée dans `<StrictMode>` pour activer des vérifications et des avertissements
 * supplémentaires en mode développement, aidant à détecter les problèmes potentiels.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Crée une racine React pour l'élément DOM avec l'ID 'root'.
createRoot(document.getElementById('root')).render(
  // Active le StrictMode de React pour des vérifications supplémentaires en développement.
  <StrictMode>
    {/* Rend le composant principal de l'application. */}
    <App />
  </StrictMode>,
)
