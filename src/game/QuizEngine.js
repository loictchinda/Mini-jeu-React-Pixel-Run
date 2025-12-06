import { TRIVIA_URL, NUM_OPTIONS } from "./constants";
import { gameState } from "./GameState";

/**
 * Mélange un tableau (shuffle)
 */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Récupère une question depuis Trivia API
 * @param {string} category - L'identifiant de la catégorie (ex: 'history', 'science')
 */
export async function fetchQuestion(category) {
  try {
    // Construction de l'URL avec la catégorie dynamique
    const url = `${TRIVIA_URL}?categories=${category}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    const q = data[0];

    if (!q) {
      throw new Error("Aucune question reçue de l'API");
    }

    
    const correct = q.correctAnswer;

    // Choisir seulement 2 mauvaises réponses
    const wrongs = shuffle(q.incorrectAnswers).slice(0, NUM_OPTIONS - 1);

    // Mélanger la bonne réponse avec les mauvaises
    const options = shuffle([correct, ...wrongs]);

    // Indice de la bonne réponse
    const correctIndex = options.indexOf(correct);

    // Mise à jour de l'état global (si utilisé ailleurs)
    gameState.setQuestion(q.question, options, correctIndex);

    
    return {
      question: q.question,
      options,
      correctIndex,
      category: q.category 
    };

  } catch (err) {
    console.error("Erreur API Trivia :", err);
   
    return {
      question: "Erreur de chargement. Prêt ?",
      options: ["Oui", "Non", "Peut-être"],
      correctIndex: 0,
      category: "Erreur"
    };
  }
}
