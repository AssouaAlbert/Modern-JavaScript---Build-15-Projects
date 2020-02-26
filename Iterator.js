const cart = ['Product 0','Product 1','Product 2','Product 3','Product 4','Product 5','Product 6','Product 7','Product 8','Product 9','Product 10',]
var shoppingCart = {
    i : 0,
    next : function(cart){
        let end = (this.i >= cart.length);
                    let value = !end ? cart[this.i++] : undefined;
        
                    return {
                        end: end,
                        value: value
                    };
        }
}
console.log(shoppingCart.nextProduct(cart));
console.log(shoppingCart.nextProduct(cart));
console.log(shoppingCart.nextProduct(cart));
console.log(shoppingCart.nextProduct(cart));
console.log(shoppingCart.nextProduct(cart));
console.log(shoppingCart.nextProduct(cart));
console.log(shoppingCart.nextProduct(cart));

//Another way
function createIterator(cart) {
    return {
        i : 0,
        next: function() {
            let end = (this.i >= cart.length);
            let value = !end ? cart[this.i++] : undefined;

            return {
                end: end,
                value: value
            };
        }
    };
}
shoppingCart = createIterator(cart);
console.log(shoppingCart.nextProduct());
//Else
function createIterator(cart) {
    let i = 0;

    return {
        nextProduct: function() {
            let end = (i >= cart.length);
            let value = !end ? cart[i++] : undefined;

            return {
                end: end,
                value: value
            };
        }
    };
}
function makeIterator(object){
    start=0,stop=object.length,step=1;
    iterationCount=0;
    return {
        next : function (){
            // console.log('start,stop,step ', start,stop,step);
            if (start<stop){
                var result = {value: object[start],done:false};
                start += step;
                iterationCount++;
                return result;
            }
            return { iterationCount: iterationCount, done: true }
        }
    }
}

