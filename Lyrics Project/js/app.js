//Import all the modules fot this [roject]
import * as UI from "./ui.js";
import * as API from "./api.js";

//Add event listeners to the element objects
UI.searchForm.addEventListener('submit', checkAndValidate);
function checkAndValidate(e){
    e.preventDefault();
    const artist = UI.artist.value,
           song = UI.song.value;
   !( artist==''|| song=='')? queryAPI(artist, song): UI.printMessage('Error!! Fill the form completely', 'error');
}

//Functions definations
function queryAPI(artist, song){
    const api = new API.API(artist, song)
    const lyrics = api.queryAPI().then((data) => {
            (data.lyrics!=undefined)? UI.searchResults.innerHTML= `${data.lyrics}`:
            UI.searchResults.innerHTML=`Sorry! We can't find your music.`;
    }).catch(error=>{
        console.log('error: ', error);
    });
}