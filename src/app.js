const express = require('express')
const app = express()
const PORT = 3000

// middleware to parse POST request body
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));

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
    res.send({"name": jsonData.name, "colors": jsonData2["favoriteColors"]})
})

app.get('/api/customers', (req, res) => {
    res.send({"customers": customers})
})

app.post('/api/customers', (req, res) => {
    console.log("Received: " + JSON.stringify(req.body) )
    customers.push(req.body)
    res.send({"customers": customers})
})


// =====================================================
app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT + " ...")
})