// Common.js Syntax for importing libs (require)

// uuid return an object of different functions. 
// We grab the v4 function and call it uuidv4. 
const {v4:uuidv4} = require('uuid')
console.log(uuidv4())

// Alternative: 
const uuid = require('uuid')
console.log(uuid.v4())


// =========================================================
// Alternative: ES6 Syntax for importing libs (import).

    // // package.json => insert { "type": "module" }
    // import {v4 as idv4} from 'uuid'
    // console.log(idv4())