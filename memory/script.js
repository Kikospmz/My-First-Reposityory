const cardContainer = document.getElementById('cardContainer');
let cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // pairs of cards

// Duplicate cards to make pairs
cards = [...cards, ...cards];

// Shuffle function to randomize card positions
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

cards = shuffle(cards);

// Create HTML for each card and add to cardContainer
cards.forEach(card => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.innerHTML = `<span class="hidden">${card}</span>`;
  cardElement.addEventListener('click', flipCard);
  cardContainer.appendChild(cardElement);
});

let flippedCards = [];
let matchedCards = [];

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.querySelector('span').textContent;
  const value2 = card2.querySelector('span').textContent;

  if (value1 === value2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert('Congratulations! You matched all pairs.'), 500);
    }
  } else {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
  }

  flippedCards = [];
}
