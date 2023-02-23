'use strict';

const inputSearch = document.querySelector('.js-inputSearch');
const searchButton = document.querySelector('.js-buttonSearch');
const resetButton = document.querySelector('.js-buttonReset');
const listCocktails = document.querySelector('.js-ulAll');
const listFavs = document.querySelector('.js-ulFavs');
const url =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

let listMargaritaData = [];
let listCocktailsData = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    listMargaritaData = data.drinks;
    renderListMargarita(listCocktails);
  });

function renderListMargarita(drinks) {
  for (const cocktail of listMargaritaData) {
    drinks.innerHTML += ` <li class="li">
        <p class="namelist"> ${cocktail.strDrink} </p>
        <img class="img" src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
        </li>
        `;
  }
}

function renderListCocktails(drinks) {
  for (const cocktail of listCocktailsData) {
    drinks.innerHTML += ` <li class="li">
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img" src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          </li>
          `;
  }
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

searchButton.addEventListener('click', handleClickButton);
