const express = require('express')
const app = express()
// const Customer = require('./models/customer')
import Customer from './models/customer'
const cors = require('cors')

// Get the necessary types for typescript
import { Request, Response } from 'express'


// Read all consts from .env file depending upon NODE_ENV
// Usage:
//      $ set NODE_ENV=production  //To unset: set NODE_ENV=
//      $ npm run start
const envFileName = `.env.${process.env.NODE_ENV || "development"}`
console.log("Using Environ File: " + envFileName)
require('dotenv').config({ path: envFileName })

// Enable CORS requests. A F.End app (running on a different dev server ... say 3000), 
// can now access this server running on 3005. Do this only for development. 
app.use(cors())

// middleware to parse POST request body
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));

// Connect to online mongo DB
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)



// Set up routes
app.get('/', (req: Request, res: Response) => {
    res.send("Welcome")
})


// ------------------ CRUD OPS ------------------
// Pretty much all DB Ops are donw with async-await. 
// ----------------------------------------------

// Query Params (Optional)
app.get('/api/customers', async (req: Request, res: Response) => {
    var params = req.query
    try{
        if (params.id){
            const cust = await Customer.findById(params.id)   // Find One Customer
            res.json({ queryParams: params, "customer": cust })
        }
        else{
            const custList = await Customer.find()    // Find All customers
            res.json({ queryParams: params, "customers": custList })
        }
    } catch (e) {
        res.status(404).json({error:e.message})
    }
})

// Parameterized URL
app.get('/api/customers/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params // Destructuring syntax. 'id' grabbed from req.params and matched to {id}
        const result = await Customer.findById(id)

        if (!result) {
            res.status(404).json({error:'No Record Found'})
        }
        else {
            res.json({ 
                requestParams: req.params, 
                queryParams: req.query,
                customers: result 
            })
        } 
    } catch(e) {
        res.status(500).json({error: e.message})
    }

})


app.post('/api/customers', async (req: Request, res: Response) => {
    try{
        let customer = new Customer(req.body)   // Create the customer object
        await customer.save()                   // Save to DB. Wait for op to complete
        res.status(201).json({
            customer, 
            "Info": "Resource Created"})        // "Created (201)"
    } catch(e) {
        res.status(400).json({error:e.message}) // "Bad Request (400)"
    }
})

app.put('/api/customers/:id', async (req: Request, res: Response)=>{
    try {
        const {id} = req.params
        // The main update function below using "repaceOne". 
        const result = await Customer.replaceOne({_id:id}, req.body)

        if (!result) {
            res.status(404).json({error:'No Record Found'})
        }
        else {
            res.json({ 
                requestParams: req.params, 
                queryParams: req.query,
                result: result 
            })
        } 
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

app.delete('/api/customers/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const result = await Customer.deleteOne({_id:id})
        if (result.deletedCount == 0) {
            res.status(404).json({error:'No Record Found To Delete'})
        }
        else {
            res.json({ 
                requestParams: req.params, 
                queryParams: req.query,
                result: result 
            })
        } 
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})




// =====================================================
// Launch application. Start DB connect first, then app.Listen. 

const start = async () => {
    try {
        const DB_URI = process.env.DB_URI || "Missing Connect String"
        await mongoose.connect(DB_URI)

        const PORT = process.env.PORT || 3000  // default: dev port
        app.listen(PORT, () => {
            console.log("Listening on port " + PORT + " ...")
        })
    }
    catch (err) {
        console.log("Something bad happened ... " + err.message)
    }
}

start()