//Set Variables
import * as DB from './app.js'
let searFields = {
    make:'',
    carmodel:'',
    year:'',
    price:'',
    doors:'',
    color:'',
    transmission:''
}
const make = document.getElementById('make').addEventListener('input',function (){
    const make = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.make==make);
    showCars(result);
});
const minPrice = document.getElementById('min').addEventListener('input',function (){
    const minPrice = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.price>=minPrice);
    showCars(result);
});
const year = document.getElementById('year').addEventListener('input',function (){
    const year = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.year==year);
    showCars(result);
});
const maxPrice = document.getElementById('max').addEventListener('input',function (){
    const maxPrice = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.price<=maxPrice);
    showCars(result);
});
const doors = document.getElementById('doors').addEventListener('input',function (){
    const doors = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.doors==doors);
    showCars(result);
});
const color = document.getElementById('color').addEventListener('input',function (){
    const color = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.color==color);
    showCars(result);
});
const transmission = document.getElementById('transmission').addEventListener('input',function (){
    const transmission = this.value;
    //Filter cars based on the maker
    const result = getCars().filter((car)=>car.transmission==transmission);
    showCars(result);
});

// crear los años
const years = document.createElement('option');
const  maxyear = new Date().getFullYear();
let  minyear = maxyear - 10;

for(let i = maxyear; i >  minyear; i--) {
    let option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}
document.addEventListener('DOMContentLoaded', ()=>{
 const cars = getCars();
    showCars(cars);
});
//Function definations
function showCars(cars){
    const container = document.getElementById('result');
    while(container.firstChild){
        container.firstChild.remove();
    }
    cars.forEach(car => {
        const createHTML = document.createElement('p');
        createHTML.innerHTML=`${car.make} - Model: ${car.carmodel} - Year: ${car.year} - Price: ${car.price} - Doors: ${car.doors} - Color: ${car.color} - ${car.transmission}`;
        container.appendChild(createHTML);
    });
    if(!container.firstChild){
        const noResultsHTML = document.createElement('p');
        noResultsHTML.innerHTML=`Sorry! No results found`;
        container.appendChild(noResultsHTML);
    }
}
function getCars(){
    return DB.cars;
}
