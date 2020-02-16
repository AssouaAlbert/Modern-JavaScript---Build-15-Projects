//Instantiate the classes
const cryptoAPI = new CryptoAPI();
const ui = new UI();
//Create variables
const form = document.getElementById('form');
//Eventlisteners
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const currency = document.getElementById('currency').value; 
    const cryto = document.getElementById('cryptocurrency').value;
    if(currency==''||cryto==''||crypto==null||currency == null){
        console.log('Enter something')
        ui.printMessagege('All the fields are mandatory','deep-orange darken-4 card-panel')
    }
    else{
        cryptoAPI.queryAPI(currency,cryto)
        .then(data=>{
            ui.displayResults(data.result[0],currency);
            
        });
    }
});
