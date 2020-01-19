// Variable Section
let submitTweet =  document.querySelector("#form");

// Event Listeners

function eventListeners(){
    submitTweet.addEventListener('submit', newTweet );

}


//Functions

function newTweet (e){
    e.preventDefault();
    console.log('Working');
}
