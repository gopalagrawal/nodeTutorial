"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose"); // TS Style
// const mongoose = require('mongoose')     // JS Style
const customerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    industry: String,
    orders: [
        {
            description: String,
            amountIncents: Number
        }
    ]
});
// Map collection name to the schema above. And also export this model. 
// module.exports = mongoose.model('Customer', customerSchema)  // JS style
exports.Customer = (0, mongoose_1.model)('customer', customerSchema); // TS style
