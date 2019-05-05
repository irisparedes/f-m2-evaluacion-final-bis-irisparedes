'use strict';
const btn = document.querySelector('.btn');
let arrData = null;
let list = document.querySelector('.list');
loadRadioValue();

function loadRadioValue(){
  let savedRadioValueLS = localStorage.getItem('radioValueLS');
  let arrRadio = document.querySelectorAll('.input');
  for (let radio of arrRadio) {
    if (radio.value === savedRadioValueLS){
      radio.checked = true;
    }
  }
}

function getRadioValue () {
  let radioValue = '';
  const arrRadio = document.querySelectorAll('.input');
  for (const radio of arrRadio) {
    if (radio.checked) {
      radioValue = radio.value;
    }
  }
  localStorage.setItem('radioValueLS', radioValue);
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

    cardLi.addEventListener('click', modifyCards);

    const divFrontImage = document.createElement('div');
    divFrontImage.classList.add('div__front-card');

    const divBackImage = document.createElement('div');
    divBackImage.classList.add('div__back__card');

    if (card.isFront === true) {
      const frontImage = document.createElement('img');
      frontImage.classList.add('front__card');
      frontImage.setAttribute('src', card.image);

      divFrontImage.appendChild(frontImage);
      cardLi.appendChild(divFrontImage);
      cardLi.appendChild(frontImage);
    } else {
      const backImage = document.createElement('img');
      backImage.classList.add('back__card');
      backImage.src = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';

      divBackImage.appendChild(backImage);
      cardLi.appendChild(divBackImage);
      cardLi.appendChild(backImage);
    }
    list.appendChild(cardLi);
  }
}
function turnAround (cardJSON) {
  if(cardJSON !== null);
  if (cardJSON.isFront === true){
    cardJSON.isFront = false;
  }else{
    cardJSON.isFront = true;
  }
}


function modifyCards (event) {
  let newCardLI = event.currentTarget;
  arrData = JSON.parse(localStorage.getItem('arrDataLS'));
  for (let i = 0; i < arrData.length; i++) {
    let cardJSON = arrData[i];
    if (parseInt(newCardLI.id) === cardJSON.id) {
      turnAround(cardJSON);
    }
  }
  paintCards(arrData);
  localStorage.setItem('arrDataLS', JSON.stringify(arrData));
}

function numberCards () {
  const inputValue = getRadioValue();
  const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
  fetch((url + inputValue + '.json'))
    .then(response => response.json())
    .then(arrData => {
      createProperties(arrData);
      localStorage.setItem('arrDataLS', JSON.stringify(arrData));
      paintCards(arrData);
    });
}
btn.addEventListener('click', numberCards);


