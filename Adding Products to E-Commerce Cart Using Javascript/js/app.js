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