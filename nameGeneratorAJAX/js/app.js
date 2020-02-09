//Varaible
document.querySelector('#generate-names').addEventListener('submit',loadNames);



//Function
function loadNames (e){
    e.preventDefault();
    let country = document.getElementById('country').value;
    let genre = document.getElementById('genre').value;
    let quantity = document.getElementById('quantity').value;
    let url = 'https://uinames.com/api/?';
    if(country!==''){
        url+=`region=${country}&`
    }
    if(genre!==''){
        url+=`gender=${genre}&`
    }
    url+=`amount=${quantity}&`
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status == 200){
            const results = JSON.parse(this.responseText);
            console.log(results)
            let html = '<ul class="list">';
            results.forEach(element => {
                html +=`<li>${element.name}<br/>`
            });
            html += '</ul>'
            document.getElementById('result').innerHTML = html;
            console.log(html);
        }

    }
    xhr.send()

}


//