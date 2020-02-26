//Create variables
const searchForm = document.getElementById('search-form');
const getRecipe = document.querySelector('#results');
const searchCategories = document.querySelector('.search-category')

//Instanciate Classes
const ui = new UI();
const cockTail = new CocktailAPI();
//Create event listeners
document.addEventListener('DOMContentLoaded', loadCategories)
if(searchForm){
    searchForm.addEventListener('submit',getCocktails); //Check if the search form exist
}
if(getRecipe){
    getRecipe.addEventListener('click',resultsDelegation);
}
//Function Definations
function getCocktails(e){
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    // console.log('searchTerm: ', searchTerm);
    if(searchTerm === '' || searchTerm === null || searchTerm === undefined){
        //console.log('Print error, search term empty')
        //Print message on the UI
        ui.printMessage('PLease, fill search form', 'danger')
    }
    else {
        //The type of search
        let serverResponse;
        //Type of search; Ingedient, cocktails, name
        const type = document.querySelector('#type').value;
        switch(type){
            case 'name':
                serverResponse = cockTail.getDrinksByName(searchTerm);
                //Queary the seach API
                // cockTail.cocktailAPI(searchTerm);
                serverResponse.then((cocktails)=>{
                    console.log('cocktails: ', cocktails);
                    if(cocktails.drinks===null){
                        // Nothing exists
                       ui.printMessage('There\'re no results, try a different term ', 'danger');
                     }
                     else{
                        ui.clearPreviousResults();
                        //Display drinks with the ingredients
                        ui.displayDrinksWithIngredients(cocktails.drinks);
                    }
                });
                break;
            case 'ingredient':
                serverResponse = cockTail.getDrinksByIngredient(searchTerm);
                //Queary the seach API
                // cockTail.cocktailAPI(searchTerm);
                serverResponse.then((cocktails)=>{
                    console.log('cocktails: ', cocktails);
                    if(cocktails.drinks===null){
                        // Nothing exists
                       ui.printMessage('There\'re no results, try a different term ', 'danger');
                     }
                     else{
                        //Display drinks with the ingredients
                        ui.clearPreviousResults();
                        ui.displayDrinks(cocktails.drinks);
                    }
                });
                break;
            case 'category':
                serverResponse = cockTail.getDrinksByCategory(searchTerm);
                //Queary the seach API
                //cockTail.cocktailAPI(searchTerm);
                serverResponse.then((cocktails)=>{
                    console.log('cocktails: ', cocktails);
                    if(cocktails.drinks===null){
                        // Nothing exists
                       ui.printMessage('There\'re no results, try a different term ', 'danger');
                     }
                     else{
                        //Display drinks with the ingredients
                        ui.clearPreviousResults();
                        ui.displayDrinks(cocktails.drinks);
                    }
                });
                break;
                case 'alcohol':
                    serverResponse = cockTail.getDrinksByAlcohol(searchTerm);
                    //Queary the seach API
                    //cockTail.cocktailAPI(searchTerm);
                    serverResponse.then((cocktails)=>{
                        console.log('cocktails: ', cocktails);
                        if(cocktails.drinks===null){
                            // Nothing exists
                           ui.printMessage('There\'re no results, try a different term ', 'danger');
                         }
                         else{
                            //Display drinks with the ingredients
                            ui.clearPreviousResults();
                            ui.displayDrinks(cocktails.drinks);
                        }
                    });
                    break;
            default:
                ui.printMessage('Sorry, no results found','danger');
        }
}
}
function resultsDelegation(e){
    e.preventDefault();
    if(e.target.classList.contains('get-recipe')){
        cockTail.getSingleRecipe(e.target.dataset.id).then((recipe)=>{
            ui.displaySingleRecipe(recipe.drinks[0]);
        });
        // console.log('e.target.dataset.id: ', e.target.dataset.id);
    }
}
function loadCategories(e){
    if(searchCategories){
        ui.displayCategories(searchCategories);
    }
}