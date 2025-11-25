export function startGame(canvas, ctx) {
  const track = new Image();
  track.src = "/src/assets/trackt.png";

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
    console.log("track loaded");
  };

  function startLoop() {
    console.log("Game assets loaded, starting loop...");
    let frameIndex = 0;
    let trackOffset = 0;

function gameLoop() { 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
// Défilement sol 
   trackOffset += 4; 
   if (trackOffset >= track.width) trackOffset = 0; 
   ctx.drawImage(track, -trackOffset, 250); 
   ctx.drawImage(track, track.width - trackOffset, 250); 
   
// Dessiner le runner
  const currentFrame = frames[Math.floor(frameIndex)];
  const runnerHeight = 100;
  const runnerY = canvas.height - runnerHeight;
  ctx.drawImage(currentFrame, 350, runnerY, 100, runnerHeight);

  frameIndex += 0.2;
  if (frameIndex >= frames.length) frameIndex = 0;
  
 requestAnimationFrame(gameLoop); }

    gameLoop();
  }
}
