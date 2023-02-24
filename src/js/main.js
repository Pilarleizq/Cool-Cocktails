'use strict';

const inputSearch = document.querySelector('.js-inputSearch');
const searchButton = document.querySelector('.js-buttonSearch');
const resetButton = document.querySelector('.js-buttonReset');
const listCocktails = document.querySelector('.js-ulAll');
const listFavs = document.querySelector('.js-ulFavs');
const url ='https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';


let listMargaritaData = [];
let listCocktailsData = [];
let listFavsData = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listMargaritaData = data.drinks;
    renderListMargarita(listCocktails);
    addEventCocktails();
  });

function renderListMargarita(drinks) {
  for (const cocktail of listMargaritaData) {
    drinks.innerHTML += ` <li class="li">
        <p class="namelist"> ${cocktail.strDrink} </p>
        <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
        </li>
        `;
  }
}

function renderListCocktails(drinks) {
  for (const cocktail of listCocktailsData) {
    drinks.innerHTML += ` <li class="li" >
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          </li>
          `;
  }
  addEventCocktails();
}


function handleClickButton() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      listCocktails.innerHTML = '';
      listCocktailsData = data.drinks;
      renderListCocktails(listCocktails);
    });
}


function handleClick(ev) {
  console.log(ev.currentTarget.id);
  ev.currentTarget.parentElement.classList.toggle('selected');

  const selectedCocktail = listCocktailsData.find(drink => drink.id === ev.currentTarget.id);
  console.log(selectedCocktail);
}

function addEventCocktails() {
  const liElementsList = document.querySelectorAll('.js-li-cocktails');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClick);
  }
}

//Favoritos

// fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch.value}`)
//   .then((response) => response.json())
//   .then((data) => {
//     listFavsData = data.drinks;
//   });

searchButton.addEventListener('click', handleClickButton);
