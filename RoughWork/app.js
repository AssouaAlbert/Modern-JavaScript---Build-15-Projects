import {Clients} from './main.js';
console.log();
let clients = new Clients();
clients.printMessage();

//Creating and Object
//Using Object Literals
//Object literals must always start with a const keyword
const student1 = {
    name : "Albert",
    studclass : "Form 3",
    printfunction : function(){
        console.log(`The student ${this.name} was very late today, he is in ${this.studclass}` );
    }
};
console.log(student1.printfunction());
console.log(student1)
console.log(`The object called ${student1} was defined using object literals`);
//Another way to create objects using object literals
 //** Example **/
const objecttemp = new Object({name:"albert",class:"Working"});
console.log(`Created the the new object using another methos of literals \n const objecttemp = new Object({name:"albert",class:"Working"});`);
console.log(objecttemp);
//Yet another way of creating objects using object literals
console.log("Yet another way of creating objects using object literals: \n const objecttemp2 = new Object();");
const objecttemp2 = new Object();
objecttemp2.name = "Albert2";
objecttemp2.nextClass = "form 5";
console.log(objecttemp2);




console.log('Create an object named student and list it\'s properties');
function student(name, dob, studclass)  {
    this.name = name,
    this.dob = dob,
    this.studclass = studclass,
    this.printfunction = function () {
        console.log(`An object has been created:`);
        console.log(student);
        console.log(`The name of the student is: ${this.name} and (s)he was born on the ${this.dob} and is in form ${this.studclass}`);
    }
};
//Creating an instance 
const studentx = new student("Albert", new Date (2003-3-3), "Form 4");

console.log(studentx.printfunction());

//Object INheritance

function Client (name, balance) {
    this.name = name;
    this.balance = balance;
}

Client.prototype.clientInfo = function (){
    console.log(`This is the clien info:\nName:${this.name} \nBalance:${this.balance}`);
}
//Create an instance of the class
let client = new Client("Robert", 3000000)
//Print client information
client.clientInfo();
//Let's extent the clients information by adding him to a business position and his phoone number of the business
function Business(name,balance,phone,position){
    Client.call(this,name,balance); //Use this line to inherit the properties of the Client object
    //But note that u have not inheriteed the prototypes
    this.balance = balance;
    this.position = position;
}
//This line of code is used to inherit the prototypes which where not decalared inside the constructor
Business.prototype = Object.create(Client.prototype);
//The constructor function is still named Client.
//To change the constructor function use the line of code.
Business.prototype.constructor = Business;
let businessMan = new Business("Gilbert", 300000, 123456789, "CEO");
console.log(Client);
console.log(Business);