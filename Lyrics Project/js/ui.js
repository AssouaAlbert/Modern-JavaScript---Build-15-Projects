export const searchForm = document.getElementById('search-form'),
    searchDiv = document.querySelector('#search'),
    searchResults = document.querySelector('#result'),
    searchMessage = document.querySelector('#messages'),
    artist = document.getElementById('artist'),
    song = document.getElementById('song');

    //Print the message to when the form is filled incompletely
export function printMessage(message, className){
    searchMessage.innerHTML = `${message}`
    searchMessage.classList.add(className);
    setTimeout(()=>{
        searchMessage.innerHTML = ``;
        searchMessage.classList.remove(className);
    },3000)
}