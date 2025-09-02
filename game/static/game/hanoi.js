let towers = [];
let moves = 0;
let optimal = 0;
let selected = null;

function startGame() {
  const n = parseInt(document.getElementById("discCount").value);
  towers = [[], [], []];
  moves = 0;
  optimal = Math.pow(2, n) - 1;
  document.getElementById("moves").innerText = "Moves: 0";
  document.getElementById("optimal").innerText = "Optimal Moves: " + optimal;
  document.getElementById("statusBar").style.background = "white";

  for (let i = n; i >= 1; i--) {
    towers[0].push(i);
  }
  render();
}

function render() {
  for (let t = 0; t < 3; t++) {
    const towerDiv = document.getElementById("tower" + (t + 1));
    towerDiv.innerHTML = "";
    towers[t].forEach(size => {
      const d = document.createElement("div");
      d.className = "disc";
      d.style.width = (20 + size * 15) + "px";
      towerDiv.appendChild(d);
    });
    towerDiv.onclick = () => selectTower(t);
  }
}

function selectTower(t) {
  if (selected === null) {
    if (towers[t].length === 0) return;
    selected = t;
  } else {
    if (t !== selected) {
      let from = towers[selected];
      let to = towers[t];
      if (to.length === 0 || from[from.length - 1] < to[to.length - 1]) {
        to.push(from.pop());
        moves++;
        updateStatus();
      }
    }
    selected = null;
  }
  render();
}

function updateStatus() {
  document.getElementById("moves").innerText = "Moves: " + moves;

  if (moves <= optimal) {
    document.getElementById("statusBar").style.background = "green";
  } else if (moves <= optimal * 2) {
    document.getElementById("statusBar").style.background = "yellow";
  } else {
    document.getElementById("statusBar").style.background = "red";
  }
}
