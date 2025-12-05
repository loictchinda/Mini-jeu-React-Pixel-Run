let currentQuestion = null;
let onAnswerCallback = null;
let currentPlayerLane = 1; // 0: top, 1: middle, 2: bottom
let gameRunning = true;
let animationFrameId = null;

// NOUVELLE VARIABLE GLOBALE POUR LA VITESSE
let currentGameSpeed = 0; 
// CONSTANTE pour lier la vitesse de défilement à l'animation du coureur
const RUNNER_ANIMATION_FACTOR = 0.1;

// Definit les positions des coulloirs et du coureur
const laneYPositions = [295, 380, 460];
const laneHeight = 60; 
const runnerHeight = 100;


// =============================================================
// NOUVEAU: ÉTAT POUR GÉRER LE DÉFILEMENT DES RÉPONSES
// =============================================================
let currentAnswersState = {
    // La position X de départ (hors écran à droite)
    initialX: 1200, 
    // Tableau pour stocker les objets {text, x, y}
    options: [] 
};
// =============================================================


// =============================================================
// FONCTIONS EXPORTÉES MISES À JOUR
// =============================================================

export function updateQuestion(newQuestion) {
    currentQuestion = newQuestion;
    // Mise à jour de l'état des réponses lors d'une nouvelle question
    if (newQuestion && newQuestion.options) {
        currentAnswersState.options = newQuestion.options.map((option, index) => ({
            text: option,
            // Elles repartent de la droite
            x: currentAnswersState.initialX, 
            y: laneYPositions[index]
        }));
    } else {
        currentAnswersState.options = [];
    }
}

export function updateOnAnswerCallback(newOnAnswerCallback) {
  onAnswerCallback = newOnAnswerCallback;
}

// NOUVELLE FONCTION EXPORTÉE POUR METTRE À JOUR LA VITESSE
export function updateGameSpeed(newSpeed) {
    if (newSpeed !== undefined) {
        // La vitesse est directement mise à jour par le conteneur parent qui gère la progression
        currentGameSpeed = newSpeed;
        console.log("Vitesse interne mise à jour:", currentGameSpeed.toFixed(2)); // Log de la nouvelle vitesse
    }
}

// Surtout utile pour la version mobile
export function handleCanvasClick(x, y) {
  if (!onAnswerCallback) return;

  // Check if the click was on one of the lanes
  for (let i = 0; i < laneYPositions.length; i++) {
    const laneY = laneYPositions[i];
    if (y > laneY - laneHeight / 2 && y < laneY + laneHeight / 2) {
      onAnswerCallback(i);
      break; 
    }
  }
}
// Se déplacer avec les touches du clavier
function handleKeyDown(event) {
  if (!gameRunning) return;

  switch (event.key) {
    case "ArrowUp":
      if (currentPlayerLane > 0) {
        currentPlayerLane--;
      }
      break;
    case "ArrowDown":
      if (currentPlayerLane < laneYPositions.length - 1) {
        currentPlayerLane++;
      }
      break;
    case "Enter":
      if (onAnswerCallback) {
        onAnswerCallback(currentPlayerLane);
       
      }
      break;
  }
}
// Arrêter le jeu
export function stopGame() {
    gameRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('keydown', handleKeyDown);
}

// Fonction exportée (démarrage du jeu)
export function startGame(canvas, ctx, question, onAnswerChosen, initialSpeed) {
  gameRunning = true;
  onAnswerCallback = onAnswerChosen;
  // Définition de la vitesse initiale au démarrage
  currentGameSpeed = initialSpeed || 0.5; // Utilise la vitesse passée, sinon 0.5 par défaut
  
  const track = new Image();
  track.src = "/src/assets/trackt.png";

  // S'assure que toutes les images sont bien chargées avant de commencer
  const frames = [];
  let loadedFrames = 0;
  const totalFrames = 15;

  for (let i = 0; i <= 14; i++) {
    const img = new Image();
    img.src = `/src/assets/Run_${i}.png`;

    img.onload = () => {
      loadedFrames++;
      if (loadedFrames === totalFrames) startLoop();
    };

    frames.push(img);
  }

  track.onload = () => {
    // currentQuestion = question; // Peut être conservé si nécessaire, mais l'état des réponses est plus important pour l'affichage

    // =============================================================
    // INITIALISATION DE L'ÉTAT DES RÉPONSES AU DÉMARRAGE
    // =============================================================
    if (question && question.options) {
        currentAnswersState.options = question.options.map((option, index) => ({
            text: option,
            x: currentAnswersState.initialX, 
            y: laneYPositions[index]
        }));
    }
    // =============================================================
  };

  window.addEventListener('keydown', handleKeyDown);

  // Fonction de dessin du joueur et du sol
  function startLoop() {
    let frameIndex = 0;
    let trackOffset = 0;

    // =============================================================
    // FONCTION drawAnswers MISE À JOUR POUR LE DÉFILEMENT
    // =============================================================
    function drawAnswers() {
        if (currentAnswersState.options.length === 0) return;

        const fontSize = 16;
        const padding = 10;
        ctx.font = `${fontSize}px 'Press Start 2P', cursive`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // 1. Défilement des réponses (mise à jour de la position X)
        if (gameRunning) {
            // Utilise le même multiplicateur que la piste pour la cohérence
            const scrollSpeed = currentGameSpeed * 3; 
            currentAnswersState.options.forEach(option => {
                option.x -= scrollSpeed;
            });
        }

        // 2. Dessin des réponses à leur nouvelle position X
        currentAnswersState.options.forEach((option) => {
            // Dessiner seulement si l'option est encore visible ou proche
            if (option.x > -300) { 
                const x = option.x; // Position X dynamique
                const y = option.y;
                
                const textMetrics = ctx.measureText(option.text);
                const textWidth = textMetrics.width;

                // Background
                ctx.fillStyle = "rgba(72, 73, 74, 1)"; 
                ctx.fillRect(x - textWidth / 2 - padding, y - fontSize / 2 - padding, textWidth + padding * 2, fontSize + padding * 2);

                // Border
                ctx.strokeStyle = "rgba(20, 143, 231, 1)"; 
                ctx.lineWidth = 2; 
                ctx.strokeRect(x - textWidth / 2 - padding, y - fontSize / 2 - padding, textWidth + padding * 2, fontSize + padding * 2);

                // Text
                ctx.fillStyle = "rgba(255, 255, 255, 1)"; 
                ctx.fillText(option.text, x, y);
            }
        });
    }
    // =============================================================

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Piste
      if (gameRunning) {
        // UTILISE LA VITESSE ACTUELLE POUR LE DÉFILEMENT
        // Multiplicateur AUGMENTÉ à 12 pour un effet d'accélération plus perceptible
        trackOffset += currentGameSpeed * 12; 
        if (trackOffset >= track.width) trackOffset = 0;
      }
      ctx.drawImage(track, -trackOffset, 250);
      ctx.drawImage(track, track.width - trackOffset, 250);

      // Coureur
      const currentFrame = frames[Math.floor(frameIndex)];
      const runnerY = laneYPositions[currentPlayerLane] - runnerHeight / 2;
      ctx.drawImage(currentFrame, 350, runnerY, 100, runnerHeight);

      if (gameRunning) {
        // L'animation du coureur est liée à la vitesse actuelle pour l'effet d'accélération
        frameIndex = (frameIndex + currentGameSpeed * RUNNER_ANIMATION_FACTOR) % frames.length;
      }

      drawAnswers();

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }
}