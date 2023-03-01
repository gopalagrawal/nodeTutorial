import {Schema, model} from 'mongoose'      // TS Style
// const mongoose = require('mongoose')     // JS Style

const customerSchema = new Schema( {
    name: {type:String, required:true},
    industry: String,
    orders: [
        {
            description: String,
            amountIncents: Number
        }
    ]
})

// Map collection name to the schema above. And also export this model. 
// module.exports = mongoose.model('Customer', customerSchema)  // JS style
export const Customer = model('customer', customerSchema)       // TS style