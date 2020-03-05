'use strict';

for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
    switch(process.argv[j]){
        case 'one':
        console.log('One:',process.argv[j]);
        break;
        case 'two':
        console.log('Two: ',process.argv[j] );
        break;
        case 'three':
        console.log('Three: ',process.argv[j]);
        break;
        case 'four':
        console.log('Four: ',process.argv[j]);
        break;
        default:
        console.log('None');
    }
}
// const myArgs = process.nodeTut.split();
// console.log('myArgs: ', myArgs);