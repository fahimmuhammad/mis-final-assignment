const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealResults = document.getElementById('meal-results');
const showAllBtn = document.getElementById('show-all-btn');

let allMeals = [];

async function searchMeals(query) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  return data.meals || [];
}

function renderMeals(meals, limit = 5) {
  mealResults.innerHTML = '';
  const limitedMeals = meals.slice(0, limit);
  limitedMeals.forEach((meal) => {
    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2>${meal.strMeal}</h2>
      <p><strong>ID:</strong> ${meal.idMeal}</p>
      <p>${meal.strInstructions.slice(0, 100)}...</p>
    `;
    mealResults.appendChild(mealCard);
  });
  if (meals.length > limit) {
    showAllBtn.style.display = 'block';
  } else {
    showAllBtn.style.display = 'none';
  }
}

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const meals = await searchMeals(query);
  allMeals = meals;
  renderMeals(meals);

  showAllBtn.addEventListener('click', () => {
    renderMeals(allMeals, allMeals.length);
  });
});
