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
 */
export async function fetchQuestion(category = "general_knowledge") {
  try {
    const response = await fetch(
      `${TRIVIA_URL}?categories=${category}&limit=1`
    );
    const data = await response.json();

    const q = data[0];

    // Bonne réponse
    const correct = q.correctAnswer;

    // Choisir seulement 2 mauvaises réponses
    const wrongs = shuffle(q.incorrectAnswers).slice(0, NUM_OPTIONS - 1);

 
    const options = shuffle([correct, ...wrongs]);

    // Indice de la bonne réponse
    const correctIndex = options.indexOf(correct);

    gameState.setQuestion(q.question, options, correctIndex);

    return {
      question: q.question,
      options,
      correctIndex,

    };
  } catch (err) {
    console.error("Erreur API Trivia :", err);
    return null;
  }
}
