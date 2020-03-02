import {amount,clientName,displayClientInfo} from "./client.js";
import {Business} from "./business.js";
console.log(amount);
console.log(clientName);
import * as clientNameObject from "./client.js";
console.log(clientNameObject.amount);
console.log(clientNameObject.clientName);
console.log(clientNameObject.amount1);
console.log(clientNameObject.clientName1);
//Exporting a function 
displayClientInfo(clientName,amount);
displayClientInfo(clientNameObject.clientName1,clientNameObject.amount1);
//Create a new object from the imported object
const newClient = new clientNameObject.Client('Hilary', 120000);
console.table(clientNameObject);
newClient.displayClientInfo();
const newBusiess = new Business('Udemy', 400000, 'Education');
newBusiess.displayBusinessInfo();
