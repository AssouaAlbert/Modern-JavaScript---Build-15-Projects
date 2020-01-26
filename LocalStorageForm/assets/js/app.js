// Variable Section
const submitTweet =  document.getElementById("form");
const tweet = document.getElementById("tweet");
const tweetList = document.getElementById("tweet-list");
// Event Listeners
eventListener ();

function eventListener(){
    //Afer Submitting the form what should happen
    submitTweet.addEventListener('submit', newTweet );

    //Remove tweet from the tweet list
    //Identify where the user has clicked on the tweetList section
    tweetList.addEventListener('click', removeTweet);

    //This events listens to when the document has been loaded
    document.addEventListener("DOMContentLoaded", localStorageTweetsOnLoad);
}

//Functions

function newTweet (e){
    e.preventDefault();
    //Read Tweet value
    let tweetValue = tweet.value;


    //Create new li element to be added to tweetlist
    let li = document.createElement("li");

    //Set the content of the list item to be the value of the new Tweet
    li.textContent = tweetValue;


    //Create Remove Button

    const removeBtn = document.createElement('a');
    removeBtn.className += 'remove-tweet';
    removeBtn.textContent = 'Delete';   

    // Append Child Button first to i
    li.appendChild(removeBtn);

    //Now append li to list
    tweetList.appendChild(li);
    
    //Call function to add tweet into local storage
    addTweetIntoLocalStorage (tweetValue);
    this.reset();


}

//Function to remove list from menu
function removeTweet(e){
    e.preventDefault();
    // Check if the clast "list array" contains remove-tweet
    if(e.target.classList.contains('remove-tweet')){
        //Move one leve up from->a->>li and delete the li
        e.target.parentElement.remove();
    }
    //This section is not neccessary because there are no options if you click away from the delete button
    else{
        
        console.log('No');
    }
    removeTweetFromLocalStorage (e.target.parentElement.textContent);

}

    //A function to add tweet to local storage
    function addTweetIntoLocalStorage (tweetValue){
        //Read tweets from local storage
        let tweets = getTweetsFromStorage ();

        //Push New tweet to array
        tweets.push(tweetValue);

        //Save new Tweet into local storage
        localStorage.setItem('tweets',JSON.stringify(tweets));
        
    }

function getTweetsFromStorage(){
        let tweets;
        const tweetsLS = localStorage.getItem('tweets'); 

        //Get the values from locat storage

        if(tweetsLS === null){
            tweets = [];
        }
        else{
            tweets = JSON.parse(tweetsLS);
        }
        return tweets;
}

    //Load from local Storage on load

    function localStorageTweetsOnLoad(){
        let tweets = getTweetsFromStorage();

        //Print individual values
        tweets.forEach((element) => {
            //Create Remove Button

            const removeBtn = document.createElement('a');
            removeBtn.className += 'remove-tweet';
            removeBtn.textContent = 'Delete';
            //Create new li element to be added to tweetlist
            let li = document.createElement("li");

            //Set the content of the list item to be the value of the new Tweet
            li.textContent = element;
            // Append Child Button first to i
            li.appendChild(removeBtn);

            //Now append li to list
            tweetList.appendChild(li);
        });

}

//Remove tweet from local storage
function removeTweetFromLocalStorage(tweet){
    //Note that the tweet arguement in this function is the content of the li element
    //Get tweets array from storage
    let tweets = getTweetsFromStorage();
    
    //Remove "Delete" from the tweet
    let tweetDelete = tweet.substring(0, tweet.length-6);

    //Loop through the tweets array and remove the tweet that is equal
    tweets.forEach((item, index)=>{
        if(item === tweetDelete){
            console.log("Item is: "+item);
            console.log(tweets);
            console.log("Yes Deleted");
            tweets.splice(index, 1);
            console.log(tweets);
        }

    });
    //Saves the data back to loacal storage
    localStorage.setItem("tweets", JSON.stringify(tweets));


}
   