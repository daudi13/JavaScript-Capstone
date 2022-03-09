import getData from './modules/api-utils.js';

import './style.css';

const FOOD_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const ALL_FOOD_ENDPOINT = 'filter.php?a=Jamaican';
const ALL_FOOD_API_URL = FOOD_API_BASE_URL + ALL_FOOD_ENDPOINT;

const foodListWrapper = document.getElementById('home');

function getAllFoodDataAndRender() {
  getData(ALL_FOOD_API_URL).then((res) => {
    const allFood = res.meals;

    // clear loading text
    foodListWrapper.innerHTML = '';

    allFood.forEach((food) => {
      foodListWrapper.innerHTML += `
      <div class="food-card" id="${food.idMeal}">
        <img src="${food.strMealThumb}" alt="image of meal" />
        <div class="mid-sec">
          <h3 class="food-title">${food.strMeal}</h3>
          <div class="likes">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            <div class="likes-counter">5 likes</div>
          </div>
        </div>
        <button class="btn comments-button">comments</button>
      </div>
      `;
    });
  });
}

const INV_API_BASE = 'https://us-central1-involvement-api.cloudfunctions.net/'
  + 'capstoneApi/apps/';
const INV_API_KEY = 'zX9lc5HNiZeTfJrwouGw';
const LIKES_ENDPOINT = '/likes';

const likes = {};

function getAllLikes() {
  const ALL_LIKES_API_URL = INV_API_BASE + INV_API_KEY + LIKES_ENDPOINT;

  const likesObjects = getData(ALL_LIKES_API_URL);
  likesObjects.forEach((likeObject) => {
    likes[likeObject.item_id] = likeObject.likes;
  });
}

getAllFoodDataAndRender();
getAllLikes();
