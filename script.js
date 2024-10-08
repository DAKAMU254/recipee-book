const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';  

document.getElementById('searchForm').addEventListener('submit', async function(event) {  
    event.preventDefault();  
    
    const searchTerm = document.getElementById('searchInput').value;  
    const response = await fetch(`${API_BASE_URL}/search.php?s=${searchTerm}`);  
    const data = await response.json();  
    displayRecipes(data.meals);  
});  

function displayRecipes(recipes) {  
    const resultsDiv = document.getElementById('recipeResults');  
    resultsDiv.innerHTML = '';  

    if (!recipes) {  
        resultsDiv.innerHTML = '<p>No recipes found.</p>';  
        return;  
    }  

    recipes.forEach(recipe => {  
        const recipeCard = document.createElement('div');  
        recipeCard.className = 'recipe-card';  
        recipeCard.innerHTML = `  
            <h2>${recipe.strMeal}</h2>  
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">  
            <p><strong>Instructions:</strong> ${recipe.strInstructions}</p>  
            <button class="save">Save Recipe</button>  
        `;  
        
        resultsDiv.appendChild(recipeCard);  

        // Add click event to save this recipe  
        recipeCard.querySelector('.save').addEventListener('click', function() {  
            saveRecipe(recipe);  
        });  
    });  
}  

function saveRecipe(recipe) {  
    const savedRecipesList = document.getElementById('savedRecipes');  
    const listItem = document.createElement('li');  
    listItem.textContent = recipe.strMeal;  
    
    // Add remove button for the saved recipe  
    const removeButton = document.createElement('button');  
    removeButton.textContent = 'Remove';  
    removeButton.onclick = function () {  
        savedRecipesList.removeChild(listItem);  
    };  
    
    listItem.appendChild(removeButton);  
    savedRecipesList.appendChild(listItem);  
}