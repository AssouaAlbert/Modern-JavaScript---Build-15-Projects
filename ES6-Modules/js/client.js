export const clientName ='Juan';
export const amount = 40000;
export const clientName1 = 'Albert';
export const amount1 = 300000;
export function displayClientInfo(name,amount){
    console.log(`Client name: ${name}.\n Amount: ${amount}`);
}
export class Client{
    constructor(name,amount){
        this.name= name;
        this.amount= amount;
    }
    displayClientInfo() {
    console.log(`Client name: ${this.name}.\n Amount: ${this.amount}`);
}
}