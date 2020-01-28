//Onjectives
/*
- Disable Sent and Resend Button When the document is loaded
- After leaving each text field check if the value of the field meet with the regular expression
- If yes: 
- else:

*/
//define the Varaibles
const to = document.getElementById('email'), //Access the To field
    subject = document.getElementById('subject'), //Access the Subject field
    message = document.getElementById('message'), //Access the Message field
    form = document.getElementById('email-form'), //Access the Form
    sendBtn = document.getElementById('sendBtn'), //Access the Send Button
    reset = document.getElementById('resetBtn'), //Access the To Reset Button
    emailRegexp = /^([a-zA-Z0-9\.-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/; //Regulalar Expression for emails
    subjectRegexp = /.+/;
    messageRegexp =/\w/g
let booleanMessage = booleanSubject = booleanTo = false;

//create Event listeners
eventLoader();

function eventLoader(){
    document.addEventListener('DOMContentLoaded',appInit);
    message.addEventListener('blur',checkMessageValue);
    subject.addEventListener('blur',checkSubjectValue);
    to.addEventListener('blur',checkToValue);
    form.addEventListener('submit',sendMail);
}


//Define the functions
function sendMail (e){
    e.preventDefault(); //Prevent the default settings
        let spinner = document.getElementById('spinner'); //select the hidden spinner 
        spinner.style.display = 'block'; //display the hidden spinner as a block element
    //After the spinner works for 3 seconds it should be hidden;
    let timeout = setTimeout (function () { 
    spinner.style.display = 'none'; // after 3 seconds hide the spinner 
    let sendEmailImg = document.createElement('img'); // Create an element to hold the img for the email sent icon
    sendEmailImg.src = 'img/mail.gif'; //The sorce of the sent email icon
    sendEmailImg.style.display = 'block'; //Change the style of this icon to block 
    document.querySelector('#loaders').appendChild(sendEmailImg); //Display this icon
    sentEmailTimeOut = setTimeout(() => {
        sendEmailImg.remove();
        form.reset();
        booleanMessage = booleanSubject = booleanTo = false;
        sendBtn.disabled = true;
    }, 5000); //After 5 seconds delete the loaders  
    
    }, 3000);

}

function checkToValue(e){
    e.preventDefault(); //Prevent the default from happening when this event is triggered 
    if (emailRegexp.test(e.target.value)){ //This will test the the To field to see if it meets with the regular expression 
        //Note here that the e.target.value is the same as this.value
        console.log('This is an email: ' + this.value);
        //This will set the chracteristics of a valid To field
        this.style.borderBottomColor = 'green';
        this.classList.remove('error');
        booleanTo = true;
    }
    else{
        //This will set the chracteristics of an invalid field
        this.style.borderBottomColor = 'red';
        this.classList.add('error');
        console.log(`This is not and email ${this.value}`);
        booleanTo = false;
    }
    eventCheckFormValidity (); //Run the function on blur

}
function checkSubjectValue(e){
    e.preventDefault(); //Prevent the default from happening when this event is triggered 
    if (subjectRegexp.test(this.value)){ //This will test the the To field to see if it meets with the regular expression 
        //Note here that the e.target.value is the same as this.value
        console.log('This is your subject' + this.value);
        //This will set the chracteristics of a valid To field
        this.style.borderBottomColor = 'green';
        this.classList.remove('error');
        booleanSubject = true;
    }
    else{
        //This will set the chracteristics of an invalid field
        this.style.borderBottomColor = 'red';
        this.classList.add('error');
        console.log(`This is not a subject : ${this.value}`);
        booleanSubject = false;
    }
    eventCheckFormValidity (); //Run the function on blur

}
function checkMessageValue(e){
    e.preventDefault(); //Prevent the default from happening when this event is triggered 
    if (messageRegexp.test(this.value)){ //This will test the the To field to see if it meets with the regular expression 
        //Note here that the e.target.value is the same as this.value
        console.log('This is your message' + this.value);
        //This will set the chracteristics of a valid To field
        this.style.borderBottomColor = 'green';
        this.classList.remove('error');
        booleanMessage = true;
    }
    else{
        //This will set the chracteristics of an invalid field
        this.style.borderBottomColor = 'red';
        this.classList.add('error');
        console.log(`This is not a message : ${this.value}`);
        booleanMessage = false;
    }
    eventCheckFormValidity (); //Run the function on blur
}

function appInit(e){
    console.log("Document's Content has loaded.");
    sendBtn.disabled = true;
}

function eventCheckFormValidity (){
    if (booleanMessage && booleanSubject && booleanTo){
        sendBtn.disabled = false;
    }
}