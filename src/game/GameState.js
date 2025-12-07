/**
 * Représente l'état global du jeu.
 * Cette classe est utilisée comme un singleton pour stocker des informations
 * telles que le score, la question en cours, et les options de réponse.
 * Note : L'état principal de l'application est géré par les composants React,
 * cette classe peut servir de support ou pour des logiques non-React.
 */
class GameState {
  
  /**
   * Initialise l'état du jeu avec des valeurs par défaut.
   */
  constructor() {
    /** @type {number} Le score actuel du joueur. */
    this.score = 0;
    /** @type {string | null} Le texte de la question actuelle. */
    this.currentQuestion = null;
    /** @type {number | null} L'index de la bonne réponse dans le tableau d'options. */
    this.correctAnswerIndex = null;  
    /** @type {string[]} Les options de réponse pour la question actuelle. */
    this.options = [];
  }

  /**
   * Met à jour l'état avec une nouvelle question et ses réponses.
   * @param {string} question - Le texte de la nouvelle question.
   * @param {string[]} options - Le tableau des options de réponse.
   * @param {number} correctIndex - L'index de la réponse correcte.
   */
  setQuestion(question, options, correctIndex) {
    this.currentQuestion = question;
    this.options = options;
    this.correctAnswerIndex = correctIndex;
  }

  /**
   * Ajoute une valeur au score actuel.
   * @param {number} amount - La valeur à ajouter au score.
   */
  addScore(amount) {
    this.score += amount;
  }
}

/**
 * Instance unique (singleton) de GameState, exportée pour être utilisée dans toute l'application.
 * @type {GameState}
 */
export const gameState = new GameState();
