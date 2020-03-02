import {Client} from "./client.js";
export class Business extends Client{
    constructor(name, amount, category){
        super(name,amount);
        this.category = category;
    }
    displayBusinessInfo() {
    console.log(`Client name: ${this.name}\n Amount: ${this.amount}\nCategory: ${this.category}`);
}
}