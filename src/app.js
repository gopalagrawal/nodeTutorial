const express = require('express')
const app = express()
const PORT = 3000

// Set up routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
})


// =====================================================
app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT + " ...")
})