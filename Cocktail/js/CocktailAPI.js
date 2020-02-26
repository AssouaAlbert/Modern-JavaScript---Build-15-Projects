class CocktailAPI {
     // Get recipe by name
     async getDrinksByName(name) {
        // Search by name
        const apiResponse = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        // Returns a json respone
        const cocktails = await apiResponse.json();

        return cocktails;
   }
   async getDrinksByIngredient(ingredient) {
     // Search by name
     const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
     // Returns a json respone
     const cocktails = await apiResponse.json();
     return cocktails;
     }
     async getSingleRecipe(id){
     // Search by name
     const apiResponse = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
     const cocktails = await apiResponse.json();
     return cocktails;
     }
}