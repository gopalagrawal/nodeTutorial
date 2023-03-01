// @ts-nocheck

const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema( {
    name: {type:String, required:true},
    industry: String
})

// Map collection name to the schema above. And also export this model. 
module.exports = mongoose.model('Customer', customerSchema)