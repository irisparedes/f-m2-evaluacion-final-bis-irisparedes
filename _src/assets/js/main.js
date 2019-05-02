'use strict';
console.log('>> Ready :)');
const btn = document.querySelector('.btn');
let arrData = null;
let urlBackImage = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
let list = document.querySelector('.list');
//const arrRadio = document.querySelectorAll('.input');
//const inputValue = input.value;
//const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';

function getRadioValue () {
  let radioValue = '';
  const arrRadio = document.querySelectorAll('.input');
  for (const radio of arrRadio) {
    if (radio.checked) {
      radioValue = radio.value;
    }
  }
  return radioValue;
}
function createProperties (arrData) {
  for (let i = 0; i < arrData.length; i++) {
    let data = arrData[i];
    data.id = i;
    data.isFront = false;
  }
}

function paintCards (arrCard) {
  list.innerHTML = '';
  for (const card of arrCard) {

    const cardLi = document.createElement('li');
    cardLi.classList.add('card');
    cardLi.setAttribute('id', card.id);

    const divFrontImage = document.createElement('div');
    divFrontImage.classList.add('div__front-card');

    const divBackImage = document.createElement('div');
    divBackImage.classList.add('back__card');

      if (card.isFront === true) {
        const frontImage = document.createElement('img');
        frontImage.classList.add('front__card');
        //frontImage = card.image;
        frontImage.setAttribute('src', card.image);

        divFrontImage.appendChild(frontImage);
        cardLi.appendChild(divFrontImage);
        cardLi.appendChild(frontImage);
      } else {
        const backImage = document.createElement('img');
        backImage.classList.add('back__card');
        backImage.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';//urlBackImage;

        divBackImage.appendChild(backImage);
        cardLi.appendChild(divBackImage);
        cardLi.appendChild(backImage);
      }
      list.appendChild(cardLi);
  }
}

// const turnAround = (event) => {
//   let card = event.currentTarget;
//   card.classList.toggle('');
// }

function numberCards () {
  const inputValue = getRadioValue();
  const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
      fetch((url + inputValue + '.json'))
        .then(response => response.json())
        .then(arrData => {
          createProperties(arrData);
          paintCards(arrData);
        });
}

btn.addEventListener('click', numberCards);

