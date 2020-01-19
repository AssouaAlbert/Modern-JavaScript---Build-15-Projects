# Modern-JavaScript---Build-15-Projects

In this project I study and exploit the fundamental parts of javascript by creating 15 modern projects. At the end of this program, I will create another project to use Jquery as the library to make it simpler to understand. I hope you go through these projects and enjoy the work. I will add some functionality since this is an online course an I have some basic knowledge about JavaScript.

## 		1. Saving Tweets into Local Storage of the browser
### About
This project is a starter project to save tweets (strings) into the local storage of the browser. With local storage the data is stored and can be retrieved even if the browser is closed but this data will be deleted if the user does any of the following:

	* Deletes browsers history
	* Clears Cache
	* Deletes Cookies
An alternative is Session storage but this is more volatile since if the data is automatically deleted as soon as the tab or current window is closed.
Session and local storage have the same syntax but session storage is more volatile that is the major difference.

## Algorithm and break down of code

1. ### Create and initialize variables
	Create global variable to access 
		- New tweets text field
		- Submit Button
		- Old Tweets list
	
	```javascript
	const submitTweet=document.getElementById("form");
	const tweet =document.getElementById("tweet");
	const tweetList = document.getElementById("tweet-list");
2. ### Event listener
	Create 'submit' eventlister for submit button
	```javascript
	eventListener ();
	function eventListener(){
	//Afer Submitting the form what should happen
	submitTweet.addEventListener('submit', newTweet );
3. ### On Submit
	- PreventDefault event ()
	- Read the the value of the tweets-fields (tweet-value) 
	- Create a new li element
	- The textContent of new-li is the value tweet-value
	- Create a anchor element with css name = remove-tweet
	-	This anchor is to delete the tweet when clicked
	- Add textContent = 'Delete'
	```javascript
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
	``
4.	### Add tweets to list and to local storage
	- AppendChild new-li tweet-list
	- Append Child new-a to new-li
	- Clear the tweet field using this.reset(); this is the  form object

	Now that the tweet is displayed on the tweets list it is time to save it into local Storage
	- Call the function to add the content into local storage. addTweetIntoLocalStorage ()
	-   Parse the new tweetValue as an argument 

5. ### Add Tweets to Local Storage
	- In the addTweetIntoLocalStorage function the main thing is pushing the content into the current values of the local Storage

	- Since the local storage only stores strings the getTweetsFromStorage() will return an array of the contents in the local storage.

	- This is by getting the the values and converting them to and array and returning this array.

	- The tweet is pushed into the array and converted back to string using JSON.stringify(array)

	The content is set into the local storage.
6. ### Get tweets from local Storage
	
	The function to get tweets from local storage is define here and it returns an array of the twees stored in the local storage.  
    **Note that only addTweetsIntoLocalstorage converts array to string and stores, while get will get the using values and return an array**

    ```javascript

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
    ```

7. ### Romoving tweets from screen and from local storage
	Removing the tweets from the Screen and Local storage is the next phase
	- prevent Default on the anchor link
	- Add event Listener on tweetlist to call function removeTweet
	- When an element is clicked, check element contains classname remove-tweet
	 - if Yes, remove parent element using e.target.parentElement.remove();
	- Now delete the content from the local storage by calling the function removeTwetFromLocalStorage
	- Parse the content of the parent of the event target as argument. 

	```javascript
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
 8. ### Removing tweet from local storage
	Removing the content from the local 			storage is little tricky:
	- **Note the tweet to delete textContent contains the textContent of the anchor too e.g. HistoryDelete**
	- First is removing the last part of this string by using 
	- string.substring(0,string.lenght-6)
	- Now get the array of the string in the local storage by using the getTweetsFromStorage()... Remember this will return an array
	- Use the for each iterating function to compare the item of the array to the tweet to delete and delete the index using splice.
	- array.splice(index, 1)
	- And send the item back to local storage. note that it will always overwrite the default values in the local storage
	```javascript
	function removeTweetFromLocalStorage(tweet){
    //Note that the twee arguement in this function is the content of the li element
    //Get tweets array from storage
    let tweets = getTweetsFromStorage();
    
    //Remove "Delete" from the tweet
    let tweetDelete = tweet.substring(0, tweet.length-6);

    //Loop through the tweets array and remove the tweet that is equal
    tweets.forEach((item, index)=>{
        if(item === tweetDelete){
            console.log("Item is: "+item);
            console.log(tweets);
            console.log("Yes Deleted")
            tweets.splice(index, 1)
            console.log(tweets);
        }

    });
    //Saves the data back to loacal storage
    localStorage.setItem("tweets", JSON.stringify(tweets));
    }
9. ### Reading the local storage on document load using documentContentLoaded event
      A major part is reading the content in local storage on displaying them on load.
	  - Create an event listener to run the function for loading the content when the document has loaded
	  	```javascript
		document.addEventListener("DOMContentLoaded", localStorageTweetsOnLoad);
		```
		>This code is at the last end of the **eventListener() ** and is called when the document loads. 
	  -  Load the content by calling function;
	  
	  ```javascript
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
 


> Written with [StackEdit](https://stackedit.io/).