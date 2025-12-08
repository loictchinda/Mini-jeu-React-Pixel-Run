/** @type {object | null} La question actuelle affichée dans le jeu. */
let currentQuestion = null;
/** @type {Function | null} La fonction de rappel à exécuter lorsqu'une réponse est choisie. */
let onAnswerCallback = null;
/** @type {number} La voie actuelle du joueur (0: haut, 1: milieu, 2: bas). */
let currentPlayerLane = 1; // 0: top, 1: middle, 2: bottom
/** @type {boolean} Indique si le jeu est en cours d'exécution. */
let gameRunning = true;
/** @type {number | null} L'ID de l'animation frame pour l'annulation. */
let animationFrameId = null;
/** @type {boolean} Indique si l'entrée utilisateur (clic) est activée. */
let inputEnabled = true;
/** @type {number} La vitesse de défilement actuelle du jeu. */
let currentSpeed = 4; 
/** @type {boolean} Indique si le jeu est en pause. */
let isGamePaused = false;

/** @const {number[]} Les positions Y pour chaque voie sur le canvas. */
const laneYPositions = [295, 390, 490];
/** @const {number} La hauteur de la zone cliquable pour chaque voie. */
const laneHeight = 60;
/** @const {number} La hauteur du sprite du coureur. */
const runnerHeight = 100;

/**
 * Met le jeu en pause ou le reprend.
 * @param {boolean} statut - True pour mettre en pause, false pour reprendre.
 */
export function setGamePaused(statut) {
    isGamePaused = statut;
}

/**
 * Définit la vitesse de défilement du jeu.
 * @param {number} speed - La nouvelle vitesse.
 */
export function setGameSpeed(speed) {
  currentSpeed = speed;
}

/**
 * Met à jour la question actuellement affichée.
 * @param {object} newQuestion - Le nouvel objet question.
 */
export function updateQuestion(newQuestion) {
  currentQuestion = newQuestion;
}

/**
 * Met à jour la fonction de rappel pour la sélection de réponse.
 * @param {Function} newOnAnswerCallback - La nouvelle fonction de rappel.
 */
export function updateOnAnswerCallback(newOnAnswerCallback) {
  onAnswerCallback = newOnAnswerCallback;
}

/**
 * Gère les clics sur le canvas pour sélectionner une réponse.
 * @param {number} x - La coordonnée X du clic.
 * @param {number} y - La coordonnée Y du clic.
 */
export function handleCanvasClick(x, y) {
  if (!onAnswerCallback || !gameRunning || !inputEnabled || isGamePaused) return;

  for (let i = 0; i < laneYPositions.length; i++) {
    const laneY = laneYPositions[i];
    if (y > laneY - laneHeight / 2 && y < laneY + laneHeight / 2) {
      onAnswerCallback(i);
      break; 
    }
  }
}

/**
 * Gère les entrées clavier pour déplacer le joueur et sélectionner des réponses.
 * @param {KeyboardEvent} event - L'objet événement du clavier.
 */
function handleKeyDown(event) {
  if (!gameRunning || isGamePaused) return;

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

/**
 * Arrête complètement le jeu et nettoie les écouteurs d'événements et l'animation.
 */
export function stopGame() {
    gameRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('keydown', handleKeyDown);
}

/**
 * Initialise et démarre la boucle de jeu principale.
 * Charge toutes les images nécessaires avant de lancer l'animation.
 * @param {HTMLCanvasElement} canvas - L'élément canvas sur lequel dessiner.
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas.
 * @param {object} question - L'objet question initial.
 * @param {Function} onAnswerChosen - La fonction de rappel à appeler lorsqu'une réponse est choisie.
 */
export function startGame(canvas, ctx, question, onAnswerChosen) {
  isGamePaused = false;
  gameRunning = true;
  onAnswerCallback = onAnswerChosen;
  
  //  Images et variables de chargement 
  const track = new Image();
 
  track.src = "/src/assets/sol1.png"; 

  const frames = [];
  let loadedImagesCount = 0;
  const totalFrames = 15;
  const totalImagesToLoad = totalFrames + 1; 

  /**
   * Vérifie si toutes les images sont chargées, puis démarre la boucle de jeu.
   */
  const checkAndStartLoop = () => {
    loadedImagesCount++;
    if (loadedImagesCount === totalImagesToLoad) {
      startLoop();
    }
  };

  //  Chargement des Cadres du Coureur 
  for (let i = 0; i <= 14; i++) {
    const img = new Image();
    img.src = `/src/assets/Run_${i}.png`; 

    img.onload = checkAndStartLoop;
    img.onerror = () => {
        console.error(`Erreur de chargement pour l'image: Run_${i}.png`);
        checkAndStartLoop();
    };
    
    frames.push(img);
  }

  //  Chargement de la Piste (Track) 
  track.onload = () => {
    currentQuestion = question;
    checkAndStartLoop();
  };
  
  track.onerror = () => {
    console.error("Erreur de chargement pour l'image de la piste.");
    checkAndStartLoop();
  };

  window.addEventListener('keydown', handleKeyDown);

  /**
   * Configure et démarre la boucle de jeu après le chargement des ressources.
   */
  function startLoop() {
    let frameIndex = 0;
    let trackOffset = 0;

    /**
     * Dessine les options de réponse sur le canvas.
     * Chaque option est affichée dans une boîte avec un fond et une bordure.
     */
    function drawAnswers() {
      
      if (!currentQuestion || !currentQuestion.options) return;

      const fontSize = 16;
      const padding = 10;
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      currentQuestion.options.forEach((option, index) => {
        if (index < laneYPositions.length) {
          const x = canvas.width / 2;
          const y = laneYPositions[index];
          const textMetrics = ctx.measureText(option);
          const textWidth = textMetrics.width;

          // Background
          ctx.fillStyle = "rgba(254, 254, 254, 1)";  
          ctx.fillRect(x - textWidth / 2 - padding, y - fontSize / 2 - padding, textWidth + padding * 2, fontSize + padding * 2);

          // Border
// Paramètres
const borderRadius = 8;
const rectX = x - textWidth / 2 - padding;
const rectY = y - fontSize / 2 - padding;
const rectWidth = textWidth + padding * 2;
const rectHeight = fontSize + padding * 2;

// Tracer rectangle arrondi
ctx.beginPath();
ctx.moveTo(rectX + borderRadius, rectY);
ctx.lineTo(rectX + rectWidth - borderRadius, rectY);
ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + borderRadius);
ctx.lineTo(rectX + rectWidth, rectY + rectHeight - borderRadius);
ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - borderRadius, rectY + rectHeight);
ctx.lineTo(rectX + borderRadius, rectY + rectHeight);
ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - borderRadius);
ctx.lineTo(rectX, rectY + borderRadius);
ctx.quadraticCurveTo(rectX, rectY, rectX + borderRadius, rectY);
ctx.closePath();

// Style et tracé
ctx.strokeStyle = "rgba(20, 143, 231, 1)";
ctx.lineWidth = 1;
ctx.stroke();

          // Text
          ctx.fillStyle = "rgba(84, 83, 83, 1)"; 
          ctx.fillText(option, x, y);
        }
      });
    }

    /**
     * La boucle de jeu principale, appelée à chaque frame d'animation.
     */
    function gameLoop() {
      if (!gameRunning) {
        return; 
      }
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);

     
      if (gameRunning && !isGamePaused) {
        
        trackOffset += currentSpeed; 
        if (trackOffset >= track.width) {
             trackOffset -= track.width; 
        }
        // Animation des jambes
      frameIndex = (frameIndex + (currentSpeed * 0.05)) % frames.length;
      }
      
      // Dessin de la Piste 
      ctx.drawImage(track, -trackOffset, 240);
      ctx.drawImage(track, track.width - trackOffset, 240);
      
      // Dessin du Coureur
      const currentFrame = frames[Math.floor(frameIndex)];
      
      if (currentFrame) { 
        const runnerY = laneYPositions[currentPlayerLane] - runnerHeight / 2;
        ctx.drawImage(currentFrame, 150, runnerY, 100, runnerHeight);
      }

    
      drawAnswers();

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }
}


    