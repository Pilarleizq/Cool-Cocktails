"use strict";

const searchButton = document.querySelector(".js-buttonSearch");
const resetButton = document.querySelector(".js-buttonReset");
const listCocktails = document.querySelector(".js-ulAll");
const listFavs = document.querySelector(".js-ulFavs");
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

let listCocktailsData = [];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.drinks);
    listCocktailsData = data.drinks;
    renderListCocktails(listCocktails);
  });

function renderListCocktails(drinks) {
  for (const cocktail of listCocktailsData) {
    drinks.innerHTML += ` <li class="li">
        <p> ${cocktail.strDrink} </p>
        <img class="img" src=${cocktail.strDrinkThumb} alt="Foto del cocktail"/>
        </li>
        `;
  }
}
