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
 
## 		2. Adding Products to E-Commerce Cart Using JavaScript
### About
For this project the objectives are as follows:

	* On document load, read the items in local storage and print the products on the cart
	* Create an eventListener for the Add to Cart Buttons
	* Get information about the Product Cart
	* Store the information in an object
	* Access the Cart table and insert the information of the product into the cart
	* Push the newly added product to the localStorage
	* Add a delete button to items on the cart
	* When the button is clicked, delete the item from the local storage and delete the item from the cart
This project is a complex example of the first project, using objects and creating a more dynamic innnerHTML output.

I can not write to eplain in detail everything which was done as I did in the previous project, but I think the comments in the code will better explain

**Thank you**

		```javascript

		//Deine the Variable
		//Variable to access the courses in the div
		const courses = document.querySelector('#courses-list');
		//Select the table to add the slected courses into the cart
		const tableContent = document.querySelector('#cart-content tbody');
		//Using the clear cart bitton to clear the cart
		const clearCartBtn = document.getElementById('clear-cart');
		//***Listeners***
		//Load event listerners when the document load is complete
		eventlistener ()
		function eventlistener(){
			//When any evelent in the div is clicked. get the target and run the buyCourse function
			courses.addEventListener('click',buyCourse);
			//Add event listener to remove responf when remove button is clicked
			tableContent.addEventListener('click',removeCourse);
			//Clear the cart when clicked
			clearCartBtn.addEventListener('click',clearCart);
			//Load content to shopping cart when the document loads
			document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
			
		}
		//Functions
		function buyCourse(e){
			//Prevent the defualt settings to apply to the target element.
			e.preventDefault();
			//Try to see if the code is working when an element in that section is clicked
			console.log(e.target);
			//Check if the element which had been clicked contains the class add-to-cart
			if(e.target.classList.contains('add-to-cart')){
				//Try if code works
				console.log('Added!');
				//OK, the add to cart has been clicked
				//Read the content of the siblings in the cart which will include title, price, and imaage
				//Move to the top of the parent element to read the information
				const course = e.target.parentElement.parentElement;
				getCourseInfo(course);    
			}
		}
		//Reads the textContent of the Course
		//And Creates an object which holds this information
		function getCourseInfo(course){
			const courseInfo = {
				image : course.querySelector('img').src,
				title : course.querySelector('h4').textContent,
				price : course.querySelector('.price span').textContent,
				id : course.querySelector("a").getAttribute('data-id'),
			}
			//Try code to make sure everthing is working
			console.log(courseInfo);
			//OK! Now that the Course information had been read, it is time to pass the information into the shoppiung cart
			addCourseToCart(courseInfo);
		}
		function addCourseToCart(courseInfo){
			//Beacuase the cart is a 1x3 table we will need to create a new row for each added course to add into the table
			//The table is Image/Name/Price
			//Step 1 Create new row to hold the new item to cart
			const row = document.createElement('tr');
			//Build a template from the course object
			row.innerHTML = `<tr>
			<td>
			<!--
			Add a width attribute to the image to make it smaller
			-->
			<img src='${courseInfo.image}' width="100"/>
			</td>
			<td>
			<h4>${courseInfo.title}</h4>
			</td>
			<td>
			<p>${courseInfo.price}</p>
			</td>
			<td>
			<a href="#" class="remove" data-id="${courseInfo.id}">X</a>
			</td>
			</tr>
			`;
			//The content has to be added to the table 
			tableContent.appendChild(row);
			//Add Course into the Storage
			addToLS(courseInfo);

		}
		function  addToLS(addCourseToLS){
			let lsCoursesList = getCoursesFromLS();
			//adding the course into the array using push
			lsCoursesList.push(addCourseToLS);
			console.log(`Added: ${localStorage.getItem('courses')}`);
			localStorage.setItem('courses', JSON.stringify(lsCoursesList));

		}
		function getCoursesFromLS (){
			let getLsCoursesInfo;
			const lsValue = localStorage.getItem('courses');
			if(lsValue===null){
				getLsCoursesInfo = [];
			}
			else{
			getLsCoursesInfo = JSON.parse(lsValue);
			}
			return getLsCoursesInfo;
		}
		function removeCourse(e){
			//remove from DOM
			e.preventDefault();
			let course, courseID;
			if(e.target.classList.contains('remove')){
				course = e.target.parentElement.parentElement;
				e.target.parentElement.parentElement.remove();
				courseID= course.querySelector('a').getAttribute('data-id');
			}
			//Remove from local Storage
			//Using the ID
			console.log(courseID);
			removeCourseFromLS(courseID);
		}
		function removeCourseFromLS(courseID){
			let removeCourse = getCoursesFromLS();
			removeCourse.forEach((item, index) => {
				//console.log('Remove: '+item.id +'and'+courseID );
				if(item.id === courseID){
					removeCourse.splice(index,1);
				}
			});
			localStorage.setItem('courses',JSON.stringify(removeCourse));
		}
		function clearCart(e){
			e.preventDefault();
			//This is the first way to simply overite the html content in the cart but is is unorthodox therefore try to use method two
			console.log('Clear cart button clicked');
			//tableContent.innerHTML ='';

			//For the second method, check if there is a first child
			//while it is treu do a loop
			while(tableContent.firstChild){
				//in the element delet the child at the first position
				tableContent.removeChild(tableContent.firstChild);
			}
			localStorage.setItem("courses",[]);

		}
		function loadFromLocalStorage(e){
			let courseInfoLS = getCoursesFromLS();
			courseInfoLS.forEach((item) => {
			const row = document.createElement('tr');
			//Build a template from the course object
			row.innerHTML = `<tr>
			<td>
			<!--
			Add a width attribute to the image to make it smaller
			-->
			<img src='${item.image}' width="100"/>
			</td>
			<td>
			<h4>${item.title}</h4>
			</td>
			<td>
			<p>${item.price}</p>
			</td>
			<td>
			<a href="#" class="remove" data-id="${item.id}">X</a>
			</td>
			</tr>
			`;
			//The content has to be added to the table 
			tableContent.appendChild(row);
		});
		}
	```

##	Simulating Sending Email App



> Written with [StackEdit](https://stackedit.io/).