let currentQuestion = null;
let onAnswerCallback = null;
let currentPlayerLane = 1; // 0: top, 1: middle, 2: bottom
let gameRunning = true;
let animationFrameId = null;

// Definit les positions des coulloirs et du coureur
const laneYPositions = [300, 410, 530]; 
const laneHeight = 60; 
const runnerHeight = 100;

export function updateQuestion(newQuestion) {
  currentQuestion = newQuestion;
}

export function updateOnAnswerCallback(newOnAnswerCallback) {
  onAnswerCallback = newOnAnswerCallback;
}

//Surtout utile pour la version mobile
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
//Se déplacer avec les touches du clavier
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
//Arrêter le jeu
export function stopGame() {
    gameRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('keydown', handleKeyDown);
}

//Fonction exportée (démarrage du jeu)
export function startGame(canvas, ctx, question, onAnswerChosen) {
  gameRunning = true;
  onAnswerCallback = onAnswerChosen;
  const track = new Image();
  track.src = "/src/assets/sol.png";

  //S'assure que toutes les images sont bien chargées avant de commencer
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
    currentQuestion = question;
  };

  window.addEventListener('keydown', handleKeyDown);

  //Fonction de dessin du joueur et du sol
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
          ctx.fillStyle = "rgba(72, 73, 74, 1)";  //Couleur des propositions de réponse
          ctx.fillRect(x - textWidth / 2 - padding, y - fontSize / 2 - padding, textWidth + padding * 2, fontSize + padding * 2);

          // Border
          ctx.strokeStyle = "rgba(20, 143, 231, 1)"; 
          ctx.lineWidth = 2; 
          ctx.strokeRect(x - textWidth / 2 - padding, y - fontSize / 2 - padding, textWidth + padding * 2, fontSize + padding * 2);

          // Text
          ctx.fillStyle = "rgba(255, 255, 255, 1)"; 
          ctx.fillText(option, x, y);
        }
      });
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Piste
      if (gameRunning) {
        trackOffset += 4;
        if (trackOffset >= track.width) trackOffset = 0;
      }
      ctx.drawImage(track, -trackOffset,240);
      ctx.drawImage(track, track.width - trackOffset, 240);

      // Coureur
      const currentFrame = frames[Math.floor(frameIndex)];
      const runnerY = laneYPositions[currentPlayerLane] - runnerHeight / 2;
      ctx.drawImage(currentFrame, 150, runnerY, 100, runnerHeight);

      if (gameRunning) {
        frameIndex = (frameIndex + 0.2) % frames.length;
      }

      drawAnswers();

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }
}
