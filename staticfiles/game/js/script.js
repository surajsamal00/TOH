// --- Tower of Hanoi JS ---
// Works on desktop & mobile

// --- Game variables ---
let towers = [
  document.getElementById("tower1"),
  document.getElementById("tower2"),
  document.getElementById("tower3")
];
let selectedDisc = null;
let moveCount = 0;
let discTotal = 3;
let moveHistory = [];
let gameOver = false;

// --- Initialize game ---
function init(discs) {
  discTotal = discs;
  moveCount = 0;
  moveHistory = [];
  gameOver = false;
  updateMoves();

  towers.forEach(t => t.innerHTML = "");

  const towerWidth = towers[0].offsetWidth;
  const minWidth = towerWidth * 0.3;
  const maxWidth = towerWidth * 0.9;
  const step = (maxWidth - minWidth) / (discs - 1);

  for (let i = discs; i >= 1; i--) {
    let d = document.createElement("div");
    d.className = "disc";
    d.dataset.size = i;
    d.textContent = i;
    d.style.width = (minWidth + (i - 1) * step) + "px";
    let hue = (i * 60) % 360;
    d.style.backgroundColor = `hsl(${hue}, 65%, 55%)`;
    d.style.transition = "all 0.2s ease";
    towers[0].appendChild(d);
  }

  document.getElementById("gameOver").style.display = "none";
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("undoBtn").style.display = "inline-block";
}

// --- Update moves display ---
function updateMoves() {
  document.getElementById("moves").innerText = "Moves: " + moveCount;
}

// --- Tower click handling ---
function handleTowerClick(tower) {
  if (gameOver) return;

  let topDisc = tower.lastElementChild;

  if (!selectedDisc) {
    if (!topDisc) return;
    selectedDisc = topDisc;
    selectedDisc.classList.add("selected"); // highlight
  } else {
    let sourceTower = selectedDisc.parentElement;

    if (tower === sourceTower) {
      selectedDisc.classList.remove("selected");
      selectedDisc = null;
      return;
    }

    if (!topDisc || parseInt(topDisc.dataset.size) > parseInt(selectedDisc.dataset.size)) {
      // Valid move
      tower.appendChild(selectedDisc);
      selectedDisc.classList.remove("selected");

      moveHistory.push({ disc: selectedDisc, from: sourceTower, to: tower });
      moveCount++;
      updateMoves();
      selectedDisc = null;

      // Quick visual feedback
      tower.style.outline = "3px solid #ff7e67";
      setTimeout(() => tower.style.outline = "none", 300);

      checkWin();
    } else {
      alert("Invalid move!");
      selectedDisc.classList.remove("selected");
      selectedDisc = null;
    }
  }
}

// --- Add event listeners for towers (desktop + mobile touch) ---
towers.forEach(tower => {
  tower.addEventListener("click", () => handleTowerClick(tower));
  tower.addEventListener("touchstart", (e) => {
    e.preventDefault(); // avoid double triggering
    handleTowerClick(tower);
  });
});

// --- Start game from slider ---
function startGame() {
  let discs = parseInt(document.getElementById("discSlider").value);
  if (discs < 4) discs = 3;
  init(discs);
  document.getElementById("setup").style.display = "none";
}

// --- Restart game ---
function restartGame() {
  document.getElementById("setup").style.display = "block";
  towers.forEach(t => t.innerHTML = "");
  document.getElementById("moves").innerText = "Moves: 0";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("undoBtn").style.display = "none";
  selectedDisc = null;
  moveHistory = [];
  gameOver = false;
}

// --- Undo last move ---
function undoMove() {
  if (moveHistory.length === 0) return;
  let lastMove = moveHistory.pop();
  lastMove.from.appendChild(lastMove.disc);
  moveCount--;
  updateMoves();
}

// --- Check for win ---
function checkWin() {
  if (towers[2].childElementCount === discTotal) {
    gameOver = true;
    const gameOverTextEl = document.getElementById("gameOverText");

    // Show basic win message
    gameOverTextEl.innerHTML = `🎉 Well Played! You solved the puzzle in ${moveCount} moves! 🎉`;

    // Show the game over container
    document.getElementById("gameOver").style.display = "block";

    // Fetch special message from Django
    fetch("/game/get_special_message/")
      .then(res => res.json())
      .then(data => {
        const specialMessage = data.message;
        if (specialMessage) {
          gameOverTextEl.innerHTML += `<br><br><strong>${specialMessage}</strong>`;
        }
      })
      .catch(err => console.error("Failed to fetch special message:", err));
  }
}

// --- Initialize default ---
document.addEventListener("DOMContentLoaded", () => init(3));
