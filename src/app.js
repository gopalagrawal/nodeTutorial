const fs = require('fs')

const express = require('express')
const app = express()
const Customer = require('./models/customer')

// Read all consts from .env file depending upon NODE_ENV
// Usage:
//      $ set NODE_ENV=production  //To unset: set NODE_ENV=
//      $ npm run start
const envFileName = `.env.${process.env.NODE_ENV || "development"}`
console.log("Using Environ File: " + envFileName)
require('dotenv').config({ path: envFileName })

// middleware to parse POST request body
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));

// Connect to online mongo DB
const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

// "Quoted" keys with possibly spaces in there
const jsonData = {
    "name": "Gopal",
    "industry": "Looking",
    "favorite Colors": ["blue", "maroon", "purpule", "red", "lime"]
}

//Keys don't need "quotes" if no spaces. 
const jsonData2 = {
    name: "Gopal",
    industry: "Looking",
    favoriteColors: ["blue", "maroon", "purpule", "red", "lime"]
}

const customers = [
	{
		"name": "Caleb",
		"industry": "music"	
	},
	{
		"name": "John",
		"industry": "networking"	
	},
	{
		"name": "Sal",
		"industry": "sports medicine"	
	}
];


// Set up routes
app.get('/', (req, res) => {
    res.send("Welcome")
})


// ------------------ CRUD OPS ------------------
// Pretty much all DB Ops are donw with async-await. 
// ----------------------------------------------

app.get('/api/customers', async (req, res) => {
    const result = await Customer.find()    // Find all customers
    res.json({ "customers": result })       // using res.json instead of res.send. Needn't stringify
})

app.post('/api/customers', async (req, res) => {
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