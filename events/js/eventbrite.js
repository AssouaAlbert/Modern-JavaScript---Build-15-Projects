class EventBrite{
    constructor(){
        this.token_auth = '5D7FAXVF2ZTQBHU3XO'
    }
    async getCategoriesAPI(){
        const categoryResponse = await fetch(`https://www.eventbriteapi.com/v3/events/?&token=${this.token_auth}`);
        console.log('categoryResponse: ', categoryResponse);
    }
}