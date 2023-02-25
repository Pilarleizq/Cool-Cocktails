'use strict';

const inputSearch = document.querySelector('.js-inputSearch');
const searchButton = document.querySelector('.js-buttonSearch');
// const resetButton = document.querySelector('.js-buttonReset');
const listCocktails = document.querySelector('.js-ulAll');
const listFavs = document.querySelector('.js-ulFavs');

let listCocktailsData = [];
let listFavsData = [];

fetchCocktails('margarita');

function fetchCocktails(searchValue){
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      listCocktails.innerHTML = '';
      listCocktailsData = data.drinks;
      renderListCocktails(listCocktails);
    });
}

function renderListCocktails(drinks) {
  listCocktails.innerHTML = '';
  for (const cocktail of listCocktailsData) {
    drinks.innerHTML += `<li class="li" >
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          </li>
          `;
  }
  addEventCocktails();
}

function renderListFavs(listCocktailsData) {
  listFavs.innerHTML = '';
  for (const cocktail of listCocktailsData) {
    listFavs.innerHTML += ` <li class="li" >
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          </li>
          `;
  }
}

function handleClickButton() {
  fetchCocktails(inputSearch.value);
}

function handleClick(ev) {
  ev.currentTarget.parentElement.classList.toggle('selected');

  const idSelected = ev.currentTarget.id;
  const selectedCocktail = listCocktailsData.find(drink => drink.idDrink === idSelected);
  const indexCocktails = listFavsData.findIndex(drink => drink.idDrink === idSelected);

  if (indexCocktails === -1){ //Significa que no está en la lista de favs, (0,1,2,3... es la posición que ocupa)
    listFavsData.push(selectedCocktail);
    // Lo pinto (abajo para no repetirlo)
  } else { //si está en el listado, lo elimino. Splice: elimina un elemento a partir de una posición
    listFavsData.splice(indexCocktails,1);
    // Lo pinto (abajo)
  }
  renderListFavs(listFavsData);
}

function addEventCocktails() {
  const liElementsList = document.querySelectorAll('.js-li-cocktails');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClick);
  }
}

function handleInput(ev){
  ev.preventDefault();
  fetchCocktails(inputSearch.value);
}

searchButton.addEventListener('click', handleClickButton);
inputSearch.addEventListener('input', handleInput);
