const API_KEY = "23e34869df54416ebd6a6927e7235fb5 ";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";//purani receipies ko clear kr diya gaya 
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");//li ka class name hogaya recipe-item
    recipeImageEl = document.createElement("img");//image create kiya
    recipeImageEl.src = recipe.image;//src dia image ko
    recipeImageEl.alt = "recipe image";//alt diya image ko

    recipeTitleEl = document.createElement("h2");//h2 create kiya
    recipeTitleEl.innerText = recipe.title;//recipe ka title innertext me dalenge

    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <b>Ingredients:</b> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;//Ingredients ka <p> element banate hain.
// recipe.extendedIngredients ek array hota hai.
// .map() se us array mein se original ingredients nikale jaate hain.
// .join(", ") se unhe comma ke saath joda jaata hai.

    recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";//Ek anchor (<a>) element banake recipe ki original website ka link diya jata hai.

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}
//Har ek cheez ko <li> ke andar add kiya jaata hai.
// Finally, poora <li> element main <ul> (recipeListEl) ke andar daal diya jaata hai.

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`//number=5 ishliye kyunki 5 random image hi chahiye 
  );

  const data = await response.json();

  return data.recipes;
}
// Ye ek asynchronous function hai jo API call karta hai.
// fetch() use hota hai Spoonacular API se data (recipes) get karne ke liye.
// await response.json() → JSON format mein response ko parse karta hai.
// data.recipes → sirf recipes ki list return karta hai.
async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}
// Ye function app ko start karta hai.
// Pehle recipes fetch karta hai getRecipes() se.
// Phir displayRecipes() se UI mein dikhata hai.
init();//Code ke end mein init() call karte hain — taaki page load hote hi recipes dikhna start ho jaayein.
