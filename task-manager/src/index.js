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


////////////////////////// resource Reading //////////////////////////

////////////////////////// Users Model //////////////////////////
////////////////////////// fetch all //////////////////////////

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

////////////////////////// fetch by id //////////////////////////

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user) {
            return res.status(400).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})


////////////////////////// Tasks Model //////////////////////////
////////////////////////// fetch all //////////////////////////

app.get('/tasks',(req,res)=>{
    User.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send()
    })
})

////////////////////////// fetch by id //////////////////////////

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((task)=>{
        if(!task) {
            return res.status(400).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})




////////////////////////// test promise chaining to find user by id and return users who have defined age //////////////////////////

// User.findByIdAndUpdate('5465464546546',{age: 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 32})
// }).then((result)=> {
//     console.log(result)
// }).catch((e)=> {
//     console.log(e)
// })


////////////////////////// change promise chaining to async and await //////////////////////////

// const updateAgeAndCount = async (id, age)=>{
//     const user = await User.findByIdAndUpdate(id,{age:age})
//     const count = await User.countDocuments({age:age})
//     return count
// }

// updateAgeAndCount('5465464546546',2).then((count)=> {
//     console.log(count)
// }).catch((e)=> {
//     console.log(e)
// })



////////////////////////// Express Listen Port //////////////////////////
app.listen(port, () => {
    console.log('serve is up on  port ' + port)
})