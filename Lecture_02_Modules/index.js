// console.log("We are learning about the modules in node.js")
//  npm init -y for automate set Packges (for install pacakges in terminals) ->provide types:"modules"
// nodemon index.js ->for start 

// const { sum, sub, mul, div } = require("./utils");

import {sum,mul,div} from './utils.js'

console.log("adding two number = ", sum(10, 20));
console.log("mult. two number = ", mul(10, 20));
console.log("div. two number = ", div(10, 20));
