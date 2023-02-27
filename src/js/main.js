'use strict';

const inputSearch = document.querySelector('.js-inputSearch');
const searchButton = document.querySelector('.js-buttonSearch');
// const resetButton = document.querySelector('.js-buttonReset');
const listCocktails = document.querySelector('.js-ulAll');
const listFavs = document.querySelector('.js-ulFavs');
const inputTrash = document.querySelector('.js-trash');

let listCocktailsData = [];
let listFavsData = [];


const cocktailsStored = JSON.parse(localStorage.getItem('cocktails'));
if(cocktailsStored) {
  listCocktailsData = cocktailsStored;
  renderListCocktails(listCocktailsData);
} else {
  fetchCocktails('vodka');
}

const favsStored = JSON.parse(localStorage.getItem('favs'));
if(favsStored){
  listFavsData = favsStored;
  renderListFavs(favsStored);
  renderListCocktails(listCocktailsData);
}

function fetchCocktails(searchValue){
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      listCocktails.innerHTML = '';
      listCocktailsData = data.drinks;
      console.log(listCocktailsData);
      renderListCocktails(listCocktailsData);
      localStorage.setItem('cocktails',JSON.stringify(listCocktailsData));
    });
}

function renderListCocktails(listCocktailsData) {
  listCocktails.innerHTML = '';
  for (const cocktail of listCocktailsData) {
    const favCocktail = listFavsData.find(drinks => drinks.idDrink === cocktail.idDrink);
    console.log(favCocktail);
    if(favCocktail !== undefined){
      listCocktails.innerHTML += `<li class="li selected" >
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          </li>
          `;
    } else {
      listCocktails.innerHTML += `<li class="li" >
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          </li>
          `;
    }}

  addEventCocktails();
}

function renderListFavs(listCocktailsData) {
  listFavs.innerHTML = '';
  for (const cocktail of listCocktailsData) {
    listFavs.innerHTML += ` <li class="li" >
          <p class="namelist"> ${cocktail.strDrink} </p>
          <img class="img js-li-cocktails" id=${cocktail.idDrink} src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
          <img class="img2 js-fav-x" id=${cocktail.idDrink} src="./assets/images/boton-x.png"/>
          </li>
          `;
  }
  localStorage.setItem('favs',JSON.stringify(listFavsData));
  addEventToX();
}

function removeFavs (ev){
  const idRemove = ev.currentTarget.id;
  console.log(idRemove);
  const eachCocktail = listFavsData.findIndex(cocktail => cocktail.idDrink === idRemove);

  listFavsData.splice(eachCocktail,1);
  
  renderListCocktails(listCocktailsData);
  renderListFavs(listFavsData);

  localStorage.removeItem('favs');
 
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
  // } else { //si está en el listado, lo elimino. Splice: elimina un elemento a partir de una posición
  //   listFavsData.splice(indexCocktails,1);
  //   // Lo pinto (abajo)
  }
  renderListFavs(listFavsData);
}

function addEventCocktails() {
  const liElementsList = document.querySelectorAll('.js-li-cocktails');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClick);
  }
}

function addEventToX(){
  const removeIcon = document.querySelectorAll('.js-fav-x');
  for (const x of removeIcon){
    x.addEventListener('click', removeFavs);
  }
}

function handleInput(ev){
  ev.preventDefault();
  fetchCocktails(inputSearch.value);
}

// function handleTrash(ev){
//   // ev.preventDefault();
//   console.log('holis');
//   // listFavsData.splice(listFavs);
// }

searchButton.addEventListener('click', handleClickButton);
inputSearch.addEventListener('input', handleInput);
// inputTrash.addEventListener('click', handleTrash);

//prevenDefault se suele utilizar con button y etiquetas tipo submit, ya que recargan la página
// No funciona el inputTrash :( )