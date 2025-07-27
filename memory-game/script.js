const board = document.getElementById('gameBoard');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const restartBtn = document.getElementById('restart');

let score = 0;
let timer = 0;
let interval;
let flipped = [];
let matched = 0;

const emojis = ['🍌', '🍍', '🌴', '🐒', '🐍', '🦜', '🍉', '🦁'];
let cards = [...emojis, ...emojis];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  board.innerHTML = '';
  cards = shuffle(cards);
  score = 0;
  timer = 0;
  matched = 0;
  flipped = [];
  scoreEl.textContent = `Score: ${score}`;
  timerEl.textContent = `Time: ${timer}s`;

  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = `Time: ${timer}s`;
  }, 1000);

  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.textContent = '❓';
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flipped.length === 2 || card.classList.contains('matched') || flipped.includes(card)) return;

  card.textContent = card.dataset.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
      flipped.forEach(c => {
        c.classList.add('matched');
      });
      matched += 2;
      score++;
      scoreEl.textContent = `Score: ${score}`;
      if (matched === cards.length) clearInterval(interval);
    } else {
      setTimeout(() => {
        flipped.forEach(c => c.textContent = '❓');
      }, 800);
    }
    flipped = [];
  }
}

restartBtn.addEventListener('click', startGame);
window.onload = startGame;




