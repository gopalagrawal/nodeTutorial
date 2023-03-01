"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the customerSchema based on above Interface.
// Allows more TypeScript static checking. 
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
const Customer = (0, mongoose_1.model)('customer', customerSchema);
// const c: HydratedDocument<ICustomer> = new Customer ({
//     name: 'test', industry: 'test'
// })
// console.log(c.nam()) //will give errors since ICustomer should have 'name' and not 'nam' 
exports.default = Customer;
