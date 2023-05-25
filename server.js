const express = require('express')
const mongoose = require('mongoose')
const Identitas = require('./models/identitasModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//ROUTES || ENDPOINT
app.get('/', (req,res) => {
    res.send("Hello NODE API")
})

app.get('/blog', (req,res) => {
    res.send('Hello Blog, My name is Trisna')
})

//GET DATA FROM DATABASE
app.get('/identitas', async(req,res) => {
    try {
        const identitas = await Identitas.find({})
        res.status(200).json(identitas);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

//GET SPECIFIC DATA FROM DATABASE
app.get('/identitas/:nama', async(req,res) => {
    try {
        const{nama} = req.params;
        const identitas = await Identitas.find({nama});
        res.status(200).json(identitas);
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

//POST DATA TO DATABASE
app.post('/identitas', async(req,res) => {
    try {
        const identitas = await Identitas.create(req.body)
        res.status(200).json(identitas);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})

//UPDATEA DATA
app.put('/identitas/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const identitas = await Identitas.findByIdAndUpdate(id, req.body);
        //we cannot find any identitas  in database
        if(!identitas){
            return res.status(404),json({message: `cannot find any name with ID ${id}`})
        }
        const updateIdentitas = await Identitas.findById(id);
        res.status(200).json(updateIdentitas);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE DATA
app.delete('/identitas/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const identitas = await Identitas.findByIdAndDelete(id);
        //we cannot find any product in database
        if(!identitas){
            return res.status(404),json({message: `cannot find any name with ID ${id}`})
        }
        res.status(200).json(identitas);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})




mongoose.connect('mongodb+srv://admin:adminadmin123@trisnaapi.74wg52q.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API is running on  port 3000`)
    })

}).catch((error) => {
    console.log(error)
})