const express = require('express')
const app = express()

//ROUTES || ENDPOINT
app.get('/', (req,res) => {
    res.send("Hello NODE API")
})

app.listen(3000, ()=> {
    console.log(`Node API is running on  port 3000`)
})