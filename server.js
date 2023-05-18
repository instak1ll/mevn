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
app.use(express.static(path.join(__dirname, 'public')))

//frist get
app.get('/', (req, res) => res.send('Frist hello from /'))

//POST
app.post('/api/task', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//GET
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//GET ID
app.get('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//DELETE
app.delete('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ message: `Cannot find this ID: ${id}` })
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//PUT
app.put('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(id, req.body)
        if (!task) {
            return res.status(404).json({ message: `Cannot find this ID: ${id}` })
        }
        const taskUpdated = await Task.findById(id)
        res.status(200).json(taskUpdated)
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