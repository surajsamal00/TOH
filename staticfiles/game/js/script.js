let towers = [
  document.getElementById("tower1"),
  document.getElementById("tower2"),
  document.getElementById("tower3")
];
let selectedDisc = null;
let moveCount = 0;
let discTotal = 3;
let moveHistory = [];

// Initialize game
function init(discs) {
  discTotal = discs;
  moveCount = 0;
  moveHistory = [];
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
    d.style.width = (minWidth + (i-1)*step) + "px";
    let hue = (i * 50) % 360;
    d.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
    towers[0].appendChild(d);
  }

  document.getElementById("gameOver").style.display = "none";
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("undoBtn").style.display = "inline-block";
}

// Update moves display
function updateMoves() {
  document.getElementById("moves").innerText = "Moves: " + moveCount;
}

// Tower click handling
towers.forEach(tower => {
  tower.addEventListener("click", function() {
    if (selectedDisc === null) {
      let topDisc = tower.lastElementChild;
      if (topDisc) {
        selectedDisc = topDisc;
        selectedDisc.parentElement.style.outline = "3px solid blue";
        topDisc.style.outline = "2px solid black";
      }
    } else {
      let sourceTower = selectedDisc.parentElement;
      if (tower === sourceTower) {
        selectedDisc.style.outline = "none";
        sourceTower.style.outline = "none";
        selectedDisc = null;
        return;
      }

      let topDisc = tower.lastElementChild;
      if (!topDisc || parseInt(topDisc.dataset.size) > parseInt(selectedDisc.dataset.size)) {
        moveHistory.push({ disc: selectedDisc, from: sourceTower, to: tower });

        selectedDisc.style.outline = "none";
        sourceTower.style.outline = "none";
        tower.appendChild(selectedDisc);

        tower.style.outline = "3px solid green";
        setTimeout(() => tower.style.outline = "none", 400);

        selectedDisc = null;
        moveCount++;
        updateMoves();
        checkWin();
      } else {
        alert("Invalid move!");
        selectedDisc.style.outline = "none";
        sourceTower.style.outline = "none";
        selectedDisc = null;
      }
    }
  });
});

// Start game from slider
function startGame() {
  let discs = parseInt(document.getElementById("discSlider").value);
  if (discs < 3) discs = 3;
  init(discs);
  document.getElementById("setup").style.display = "none";
}

// Restart game
function restartGame() {
  document.getElementById("setup").style.display = "block";
  towers.forEach(t => t.innerHTML = "");
  document.getElementById("moves").innerText = "Moves: 0";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("undoBtn").style.display = "none";
  selectedDisc = null;
  moveHistory = [];
}

// Undo last move
function undoMove() {
  if (moveHistory.length === 0) return;
  let lastMove = moveHistory.pop();
  lastMove.from.appendChild(lastMove.disc);
  moveCount--;
  updateMoves();
}

// Check if all discs are moved to tower3
function checkWin() {
  if (towers[2].childElementCount === discTotal) {
    document.getElementById("gameOver").style.display = "block";
  }
}

// Default start
init(3);
