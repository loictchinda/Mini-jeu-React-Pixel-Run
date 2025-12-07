import { TRIVIA_URL, NUM_OPTIONS } from "./constants";
import { gameState } from "./GameState";

/**
 * Mélange un tableau en utilisant l'algorithme de Fisher-Yates (version simplifiée).
 * @param {Array<any>} array - Le tableau à mélanger.
 * @returns {Array<any>} Le tableau mélangé.
 */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Récupère une question depuis l'API The Trivia API, la met en forme et la retourne.
 * Gère également les cas d'erreur en fournissant une question de secours.
 * @param {string} category - L'identifiant de la catégorie de la question (ex: 'history', 'science').
 * @returns {Promise<object>} Une promesse qui se résout avec un objet question formaté.
 * L'objet contient `question`, `options`, `correctIndex`, et `category`.
 */
export async function fetchQuestion(category) {
  try {
    // Construction de l'URL avec la catégorie dynamique et une limite de 1 question.
    const url = `${TRIVIA_URL}?categories=${category}&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    // Extrait la première (et unique) question des données reçues.
    const q = data[0];

    if (!q) {
      throw new Error("Aucune question reçue de l'API");
    }

    // Stocke la bonne réponse.
    const correct = q.correctAnswer;

    // Sélectionne (NUM_OPTIONS - 1) mauvaises réponses et les mélange.
    const wrongs = shuffle(q.incorrectAnswers).slice(0, NUM_OPTIONS - 1);

    // Mélange la bonne réponse avec les mauvaises pour créer les options finales.
    const options = shuffle([correct, ...wrongs]);

    // Trouve l'index de la bonne réponse dans le tableau d'options mélangées.
    const correctIndex = options.indexOf(correct);

    // Mise à jour de l'état global (si utilisé ailleurs)
    gameState.setQuestion(q.question, options, correctIndex);

    // Retourne un objet propre avec toutes les informations nécessaires pour le jeu.
    return {
      question: q.question,
      options,
      correctIndex,
      category: q.category 
    };

  } catch (err) {
    console.error("Erreur lors de la récupération de la question :", err);
   
    // Fournit une question de secours en cas d'échec de l'API.
    return {
      question: "Erreur de chargement. Prêt ?",
      options: ["Oui", "Non", "Peut-être"],
      correctIndex: 0,
      category: "Erreur"
    };
  }
}
