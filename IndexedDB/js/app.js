"use strick"
//Import variables and funtions from ui.js
import * as UI from './ui.js';
//Access database and create the database
document.addEventListener('DOMContentLoaded', (e) =>{
    //Create database or upgrade the database
    const appointments = indexedDB.open('appointments',1);
    appointments.onupgradeneeded = (e) =>{
        //Get the databse
        //database = appointments.resutls; //alternative
        const db = e.target.result;
        // console.log('db: ', db);
        //Create an object store;
        //The primary key can be the index(The primary key is always an index of a databate if there are no other custers);
        //Note that I will say all creates in javascript will create an object(instance of an object) and return the reference of the object;
        //Which you store in a variable to access the object
        const objectStore = db.createObjectStore('appointments', { keyPath:'key', autoIncrement: true } );
        //Create the index
        //The first par is the name of the key(it must be the same as the name of the attribute of the object to be stored)
        //The second is the keypath(id)
        //See the notes of iterator to view the second style
        //The third attribute are the constrains
        //If you specify the schema and the object to be stored in the database has no keypath attribute,
        //Then you have to create one. 
        objectStore.createIndex('key','key',{unique:true});
        objectStore.createIndex('petName','petName',{unique:false});
        objectStore.createIndex('ownwerName','ownwerName',{unique:false});
        objectStore.createIndex('phone','phone',{unique:false});
        objectStore.createIndex('date','date',{unique:false});
        objectStore.createIndex('time','time',{unique:false});
        objectStore.createIndex('symtoms','symtoms',{unique:false});

    };
    appointments.onsuccess = (e) => {
        displayAppointments();
    }
    appointments.onerror = (e) => {

    }
    UI.form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const newAppointment ={
            petName : UI.petName.value,
            ownwerName : UI.ownwerName.value,
            phone : UI.phone.value,
            date : UI.date.value,
            time : UI.time.value,
            symtoms : UI.symtoms.value
        }
        //Create a transactions
        //All transactions are used to read or write values from and into the database
        // const txn= appointments.transaction('appointments','readwrite'); //An alternative method if you want to access only one objecStore
        const txn= appointments.result.transaction(['appointments'],'readwrite');
        // const txn= appointments.result.transaction(['appointments','example],'readwrite'); (**)
        /*From the code above remember that an array of strings can be parsed to to readonloy/readwrite (define the type of transaction) into the 
        database (apointments).
        */
       //This code below returns an object which is of type txt above to access the the appointment table(objectStore) 
       // As from line ** above if there was another object store, then another object had to be created as -->
       //onst objectStore0 = txn.objectStore('example');
        const objectStore = txn.objectStore('appointments');
        //Add the object to the object store;
        //Unfortunately yhe ket didn't auto incement... 
        //https://stackoverflow.com/questions/36016862/indexeddb-dataerror-data-provided-to-an-operation-does-not-meet-requirements
        //The solution in the link above will help. because the key was not specified I created the key to start from 0;
        const requestToAddAppoint = objectStore.add(newAppointment);
        console.log('Request Add!');
        //The statement above returns a IDBObject
        requestToAddAppoint.onsuccess = (e) =>{
            console.log('Success');
            displayAppointments();
            UI.form.reset();
        }
        requestToAddAppoint.onerror = (e) =>{
            alert(e.target.error);
        }    
    });

    function displayAppointments(){
        while(UI.appointments.firstChild){
            UI.appointments.firstChild.remove();

        }
        const txn= appointments.result.transaction(['appointments'],'readonly');
        const objectStore = txn.objectStore('appointments');
        //The cursor() is an iterator, to iterate over the objectStore
        //Open the cursor
        let cursor= objectStore.openCursor();
        cursor.onsuccess = (e) => {
            let cursor = e.target.result;
            //Note that this will return done;
            //If done, the cursor will be false and it will move to the else statement
            if(cursor){
                const addAppointment= document.createElement('li');
                addAppointment.setAttribute('data-appointment-id', cursor.value.key);
                addAppointment.classList.add('list-group-item');
                //Copied because I wanted to be faster :)
                addAppointment.innerHTML = `  
                <p class="font-weight-bold">Pet Name:  <span class="font-weight-normal">${cursor.value.petname}<span></p>
                <p class="font-weight-bold">Owner Name:  <span class="font-weight-normal">${cursor.value.ownername}<span></p>
                <p class="font-weight-bold">Phone:  <span class="font-weight-normal">${cursor.value.phone}<span></p>
                <p class="font-weight-bold">Date:  <span class="font-weight-normal">${cursor.value.date}<span></p>
                <p class="font-weight-bold">Time:  <span class="font-weight-normal">${cursor.value.hour}<span></p>
                <p class="font-weight-bold">Symptoms:  <span class="font-weight-normal">${cursor.value.symptoms}<span></p>
           `;
            // Remove button
            const removeBTN = document.createElement('button');
            removeBTN.classList.add('btn', 'btn-danger');
            removeBTN.innerHTML = '<span aria-hidden="true">x</span> Remove';
            removeBTN.onclick = removeAppointment;
        
            // add this into the HTML
            addAppointment.appendChild(removeBTN);
            UI.appointments.appendChild(addAppointment);
            cursor.continue();
            }
            else{
                if(!UI.appointments.firstChild){
                    UI.appointmentTitle.textContent= `Add new appointment`;
                    let noAppointment = document.createElement('p');
                    noAppointment.classList.add('text-center');
                    noAppointment.textContent = 'No results Found';
                    UI.appointments.appendChild(noAppointment);
                }
                else{
                    UI.appointmentTitle.textContent= `Manage appoints`;
                }
            }
        }

    };
    function removeAppointment(e){
        e.preventDefault();
        //Get the appointment id
        let appointmentID = Number( e.target.parentElement.getAttribute('data-appointment-id') );
        //Use a transaction
        let transaction = appointments.result.transaction(['appointments'], 'readwrite');
        let objectStore = transaction.objectStore('appointments');
        let deleteAppointment = objectStore.delete(appointmentID);
        deleteAppointment.oncomplete = () => {
            //An alternative code is 
            //e.target.parentElement.remove();
            e.target.parentElement.parentElement.removeChild(e.target.parentElement); 
            if(!Ui.appointments.firstChild) {
                 appointmentTitle.textContent = 'Add a new appointment';
                 let noAppointment = document.createElement('p');
                 noAppointment.classList.add('text-center');
                 noAppointment.textContent = 'No results Found';
                 appointments.appendChild(noAppointment);
            } else {
                 appointmentTitle.textContent = 'Manage your Appointments';
            }
        }
        e.target.parentElement.remove();

    }

});