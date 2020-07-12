const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000
//to make express accept json 
app.use(express.json)
////////////////////////// resource creation //////////////////////////


////////////////////////// Users Model //////////////////////////
app.post('/users', (req, res) => {
    const user = User(req.body)
    user.save().then(()=>{
        //201 success for create
        res.status(201).send(user)
    }).catch((error)=>{
        //set status to 400 as it will give 200 as default by express
        res.status(400).send(error)
    })
})



////////////////////////// Tasks Model //////////////////////////
app.post('/tasks', (req, res) => {
    const task = Task(req.body)
    task.save().then(()=>{
        //201 success for create
        res.status(201).send(task)
    }).catch((error)=>{
        //set status to 400 as it will give 200 as default by express
        res.status(400).send(error)
    })
})

////////////////////////// Express Listen Port //////////////////////////
app.listen(port, () => {
    console.log('serve is up on  port ' + port)
})