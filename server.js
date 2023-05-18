const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const Task = require('./models/taskModel')

const app = express()

const URL_CONNECT = process.env.URL_CONNECT
const PORT = process.env.PORT

//midlewers
app.use(express.json())

//frist get
app.get('/', (req, res) => res.send('Frist hello from /'))

app.post('/api/task', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect(URL_CONNECT)
    .then(() => {
        console.log('Connect whit mongo')
    })
    .catch(error => {
        console.log(error)
    })

app.listen(PORT, () => console.log(`El servidor se inicializo en el puerto ${PORT}`))