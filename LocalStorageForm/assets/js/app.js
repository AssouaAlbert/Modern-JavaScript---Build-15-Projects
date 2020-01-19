// Variable Section
const submitTweet =  document.getElementById("form");
const tweet = document.getElementById("tweet")
// Event Listeners
eventListener ();

function eventListener(){
submitTweet.addEventListener('submit', newTweet );
}

//Functions

function newTweet (e){
    e.preventDefault();
    //Read Tweet value
    let tweetValue = tweet.value;
    console.log(tweetValue);
    //Create a child element when new tweet has been submitted
    

}
