// //Store content in local Storage
// localStorage.setItem('Name','Henry');
// localStorage.setItem('Name2','Hilary');
// console.log(localStorage.getItem('Name2'));
// localStorage.removeItem('Name:');
// localStorage.clear();

const localStorageContent = localStorage.getItem('name');
//To safe multiple item silmultaneously use an array
//Only strings can be stored in a local storage meaning tht the array will be converted into a string before it is stored into the local storage
//Example: Store multiple name in local storage
let name = [];
//Name:1
name.push('Albert');
name.push('Eloumbat Assoua');
name.push('Al-Baba');
//Convert to string
let stringOfNames = JSON.stringify('name');

console.log = stringOfNames;
if (localStorageContent === null) {

}

