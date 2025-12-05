class GameState {
  
  constructor() {
    this.score = 0;
    this.currentQuestion = null;
    this.correctAnswerIndex = null;  
    this.options = [];
  }

 
  setQuestion(question, options, correctIndex) {
    this.currentQuestion = question;
    this.options = options;
    this.correctAnswerIndex = correctIndex;
  }


  addScore(amount) {
    this.score += amount;
  }
}

export const gameState = new GameState();
