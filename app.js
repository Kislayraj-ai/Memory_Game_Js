// selector fucntion

const getElement = (select) => {
  const element = document.querySelector(select);
  if (element) return element;
  else throw new Error(`Please check ${select} selector`);
};

// dom elements selected

const section = getElement('section');
const Counts = getElement('.playerLivesCount');
let totalLives = 5;
Counts.textContent = totalLives;

//generate data

const allImagesData = () => [
  { imgSrc: './images/js.png', name: 'javascript' },
  { imgSrc: './images/vue.jpg', name: 'vue' },
  { imgSrc: './images/angular.png', name: 'angular' },
  { imgSrc: './images/react.png', name: 'react' },
  { imgSrc: './images/php.png', name: 'php' },
  { imgSrc: './images/boot.png', name: 'bootstrap' },
  //-----------repeated-------------------//
  { imgSrc: './images/js.png', name: 'javascript' },
  { imgSrc: './images/vue.jpg', name: 'vue' },
  { imgSrc: './images/angular.png', name: 'angular' },
  { imgSrc: './images/react.png', name: 'react' },
  { imgSrc: './images/php.png', name: 'php' },
  { imgSrc: './images/boot.png', name: 'bootstrap' },
];

const randomCardData = () => {
  const cardData = allImagesData();
  return [...cardData].sort(() => Math.random() - 0.5);
};

const cardGenerater = () => {
  randomCardData().map((item, index) => {
    const card = document.createElement('div');
    const image = document.createElement('img');
    const backFace = document.createElement('div');

    image.src = item.imgSrc;

    card.setAttribute('data-name', item.name);
    card.classList.add('card');
    image.classList.add('face');
    backFace.classList.add('back');

    section.appendChild(card);
    card.appendChild(image);
    card.appendChild(backFace);
  });
  const card = section.querySelectorAll('.card');
  card.forEach((card) => {
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkMatching(e);
    });
  });
};

const checkMatching = (e) => {
  const selectedCard = e.target;
  selectedCard.classList.add('flipped');
  const flippedCard = section.querySelectorAll('.flipped');
  const toggleCard = section.querySelectorAll('.toggleCard');

  if (flippedCard.length === 2) {
    const getNameFirst = flippedCard[0].getAttribute('data-name');
    const getNameSecond = flippedCard[1].getAttribute('data-name');
    if (getNameFirst === getNameSecond) {
      flippedCard.forEach((cardItem) => {
        cardItem.classList.add('clickEvent');
        cardItem.classList.remove('flipped');
      });
    } else {
      flippedCard.forEach((cardItem) => {
        cardItem.classList.remove('flipped');
        setTimeout(() => cardItem.classList.remove('toggleCard'), 1400);
      });
      totalLives--;
      Counts.textContent = totalLives;
      if (parseInt(Counts.textContent) === 0) resetGame('Oops ! Try Again');
    }
    if (toggleCard.length === 12) {
      setTimeout(() => {
        // window.alert('You Won');
        resetGame('You Won');
      }, 900);
    }
  }
};

function resetGame(text) {
  let cardData = randomCardData();
  let image = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.classList.add('clickEvent');

  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');

    setTimeout(() => {
      cards[index].classList.remove('clickEvent');
      image[index].src = item.imgSrc;
      cards[index].setAttribute('data-name', item.name);
      section.classList.remove('clickEvent');
    }, 1000);
  });
  totalLives = 5;
  Counts.textContent = totalLives;
  setTimeout(() => window.alert(text), 1000);
}

cardGenerater();
