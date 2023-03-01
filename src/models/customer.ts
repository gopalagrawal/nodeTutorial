import {Schema, model, HydratedDocument} from 'mongoose'

interface IOrder {
    description: string,
    amountInCents?: number
}

interface ICustomer {
    name: string,
    industry?: string,
    orders?: IOrder[]
}

// Define the customerSchema based on above Interface.
// Allows more TypeScript static checking. 
const customerSchema = new Schema<ICustomer>({
    name: {type:String, required:true},
    industry: String,
    orders: [
        {
            description: String,
            amountIncents: Number
        }
    ]
})


const Customer = model('customer', customerSchema)

// const c: HydratedDocument<ICustomer> = new Customer ({
//     name: 'test', industry: 'test'
// })
// console.log(c.nam()) //will give errors since ICustomer should have 'name' and not 'nam' 

export default Customer