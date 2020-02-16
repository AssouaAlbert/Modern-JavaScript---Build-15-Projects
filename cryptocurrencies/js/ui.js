class UI {
    constructor(){
        this.init();
    }
    init(){
        this.printCryptoCurrencies();
    }
    printCryptoCurrencies(){
        cryptoAPI.getCrytoCurrencies()
        .then((data)=>{
            const select = document.getElementById('cryptocurrency');
            data.forEach(element => {
                //Select the element on the DOM to insert the crupto currencies
                //Add the currencies options to the DOM
                const option = document.createElement('option');
                option.value = element.id;
                option.appendChild(document.createTextNode(element.name));
                select.appendChild(option);
            });
        })
    }
    printMessagege(message, className){
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        div.style.alignContent = "block";
        document.querySelector('.messages').appendChild(div);
        //Remove the message
        setTimeout(()=>{document.querySelector('.messages div').remove()},3000)
    }
    displayResults(result,currency){
        let currencyName = 'price_'+currency.toLowerCase();
        //Read the prioce from the results
        console.log('result.currencyName: ', result[currencyName]);
        let html = ''
        html += `<div class="card cyan darken-3">
        <div class="card-content white-text">
            <span class="card-title">Result</span>
        <p>The Price of ${result.name} from ${currency} is: $${result[currencyName]}</p>
        <p>Last Hour: ${result.percent_change_1h}%</p>
        <p>Last Day: ${result.percent_change_24h}%</p>
        <p>Last 7 Days: ${result.percent_change_7d}%</p>
        </div>
    </div>
`;
    //     html =`<div class="card cyan darken-3">
    //     <div class="card-content white-text">
    //         <span class="card-title">Result</span>
    //         <p>The price of ${result.name} and rank ${result.rank} is: $ ${result.price_usd}</p>
    // `
    this.showSpinner();
    setTimeout(()=>{
        document.querySelector('.spinner img').remove();
        document.getElementById('result').innerHTML = html;
    },3000)

    }
    showSpinner(){
        const spinner = document.createElement('img');
        spinner.src = './img/spinner.gif'
        spinner.style.display = 'block';
        spinner.style.marginLeft = 'auto';
        spinner.style.marginRight = 'auto';
        document.querySelector('.spinner').appendChild(spinner);
    }
}