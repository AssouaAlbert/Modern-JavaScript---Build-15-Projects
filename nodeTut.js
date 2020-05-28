'use strict';
const yargs = require('yargs');

const argv = yargs  
    //https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
    //There are many other third modules
    .command('lyr', 'Tells whether an year is leap year or not', { 
        year: {
            description: 'the year to check for',
            alias: 'y',
            type: 'number',
        },
        day: {
            description: 'the day to check for',
            alias: 'd',
            type: 'number',
        }
    })
    .option('time', {
        alias: ('t'),
        description: 'Tell the present Time',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.time) {
    console.log('The current time is: ', new Date().toLocaleTimeString());
}

if (argv._.includes('lyr')) {
    const year = argv.year || new Date().getFullYear();
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        console.log(`${year} is a Leap Year`);
    } else {
        console.log(`${year} is NOT a Leap Year`);
    }}
    
if (argv._.includes('day')) {
    const day = argv.day || new Date().getDay();
    console.log('Day: ', day);

}

console.log(argv);

// for (let j = 0; j < process.argv.length; j++) {
//     console.log(j + ' -> ' + (process.argv[j]));
//     switch(process.argv[j]){
//         case 'one':
//         console.log('One:',process.argv[j]);
//         break;
//         case 'two':
//         console.log('Two: ',process.argv[j] );
//         break;
//         case 'three':
//         console.log('Three: ',process.argv[j]);
//         break;
//         case 'four':
//         console.log('Four: ',process.argv[j]);
//         break;
//         default:
//         console.log('None');
//     }
// }
// const myArgs = process.argv.split();
// console.log('myArgs: ', myArgs);