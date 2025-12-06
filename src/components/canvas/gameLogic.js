let currentQuestion = null;
let onAnswerCallback = null;
let currentPlayerLane = 1; // 0: top, 1: middle, 2: bottom
let gameRunning = true;
let animationFrameId = null;
let inputEnabled = false;
let currentSpeed = 4; 
let isGamePaused = false;

const laneYPositions = [295, 390, 490];
const laneHeight = 60;
const runnerHeight = 100;

export function setGamePaused(statut) {
    isGamePaused = statut;
}

export function setGameSpeed(speed) {
  currentSpeed = speed;
}

export function updateQuestion(newQuestion) {
  currentQuestion = newQuestion;
}

export function updateOnAnswerCallback(newOnAnswerCallback) {
  onAnswerCallback = newOnAnswerCallback;
}

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
//Se déplacer avec les touches du clavier
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
//Arrêter le jeu
export function stopGame() {
    gameRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('keydown', handleKeyDown);
}

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

  // Fonction de boucle de jeu 
  function startLoop() {
    let frameIndex = 0;
    let trackOffset = 0;

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

    function gameLoop() {
      if (!gameRunning) {
        return; 
      }
      console.log("Vitesse actuelle :", currentSpeed);
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


    