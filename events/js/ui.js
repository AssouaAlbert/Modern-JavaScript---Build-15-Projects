class UI {
    constructor(){
        this.init();
    }
     //App initialization
    init(){
        this.printCategoties();
    }
    printCategoties(){
        eventBrite.getCategoriesAPI();
    }
}