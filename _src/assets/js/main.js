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
    data.isMatched = false;
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

function turnAround (cardJSON){
  if (cardJSON!==null){
    if (cardJSON.isFront === true){
      //if(cardJSON.isMatched === false){
      cardJSON.isFront = false;
      //}
    }else{
      cardJSON.isFront = true;
    }
  }
  return cardJSON;
}

// function cardsTurnAround () {
//   let arrCardFront = [];
//   arrData = JSON.parse(localStorage.getItem('arrDataLS'));
//   for (let i = 0; i < arrData.length; i++){
//     let cardJSON = arrData[i];
//      if (cardJSON.isFront === true){
//       arrCardFront.push(cardJSON);
//     }
//   }
//   return arrCardFront;
// }

function modifyCards (event) {
  let newCardLi = event.currentTarget;
  let newCardLiId = parseInt(newCardLi.id);
  arrData = JSON.parse(localStorage.getItem('arrDataLS'));
  console.log(arrData);
  for (let i = 0; i < arrData.length; i++) {
    let cardJSON = arrData[i];
    if (newCardLiId === cardJSON.id) {
      if (cardJSON.isMatched===false){
        cardJSON = turnAround(cardJSON);
        paintCards(arrData);
        for (let i = 0; i < arrData.length; i++) {
          let cardPair = arrData[i];
          if (cardPair.pair === cardJSON.pair
            && cardPair.id !== cardJSON.id
            && cardPair.isFront === true) {
            cardJSON.isMatched = true;
            cardPair.isMatched = true;
          }
        }
      }
    }
  }

  //let arrCardFront = cardsTurnAround();
  console.log(arrData);
  paintCards(arrData);
  localStorage.removeItem('arrDataLS');
  localStorage.setItem('arrDataLS', JSON.stringify(arrData));
}

function numberCards () {
  const inputValue = getRadioValue();
  const url = 'https://raw.githubusercontent.com/Adalab/cards-data/master/';
  fetch((url + inputValue + '.json'))
    .then(response => response.json())
    .then(arrData => {
      createProperties(arrData);
      localStorage.removeItem('arrDataLS');
      localStorage.setItem('arrDataLS', JSON.stringify(arrData));
      paintCards(arrData);
    });
}
btn.addEventListener('click', numberCards);


