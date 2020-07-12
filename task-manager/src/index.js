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
app.post('/users', async (req, res) => {
    const user = User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(error)
    }

    

    // user.save().then(()=>{
    //     //201 success for create
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     //set status to 400 as it will give 200 as default by express
    //     res.status(400).send(error)
    // })
})



////////////////////////// Tasks Model //////////////////////////
app.post('/tasks', async(req, res) => {
    const task = Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(error)
    }
    // task.save().then(()=>{
    //     //201 success for create
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     //set status to 400 as it will give 200 as default by express
    //     res.status(400).send(error)
    // })
})


////////////////////////// resource Reading //////////////////////////

////////////////////////// Users Model //////////////////////////
////////////////////////// fetch all //////////////////////////

app.get('/users',async (req,res)=>{
    
    try{
        const users = await User.find({})
        res.status(201).send(users)
    }catch(e){
        res.status(500).send(error)
    }


    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

////////////////////////// fetch by id //////////////////////////

app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
             if(!user) {
                    return res.status(400).send()
                }
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(error)
    }

    // User.findById(_id).then((user)=>{
    //     if(!user) {
    //         return res.status(400).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})


////////////////////////// Tasks Model //////////////////////////
////////////////////////// fetch all //////////////////////////

app.get('/tasks',(req,res)=>{

    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }catch(e){
        res.status(500).send(error)
    }


    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

////////////////////////// fetch by id //////////////////////////

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
             if(!task) {
                    return res.status(400).send()
                }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(error)
    }


    // Task.findById(_id).then((task)=>{
    //     if(!task) {
    //         return res.status(400).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})



////////////////////////// resource Update //////////////////////////

////////////////////////// Users Model //////////////////////////

app.patch('/users/:id', async (req,res)=>{

    //get requested columns need to be updated
    const updates = Object.keys(req.body)
    //define allowed columns
    const allowedUpdates = ['name', 'email','password', 'age']
    //check requested coulmns with allowed columns
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})  
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } )
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})



////////////////////////// Tasks Model //////////////////////////

app.patch('/tasks/:id', async (req,res)=>{

    //get requested columns need to be updated
    const updates = Object.keys(req.body)
    //define allowed columns
    const allowedUpdates = ['description', 'completed']
    //check requested coulmns with allowed columns
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})  
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } )
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
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