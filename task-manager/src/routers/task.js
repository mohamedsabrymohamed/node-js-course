const express = require('express')
const Task = require('../models/task')
////////////////////////// create routers //////////////////////////
const router = express.Router()


////////////////////////// resource creation //////////////////////////
router.post('/tasks', async(req, res) => {
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
////////////////////////// fetch all //////////////////////////

router.get('/tasks',(req,res)=>{

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

router.get('/tasks/:id',(req,res)=>{
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

router.patch('/tasks/:id', async (req,res)=>{

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
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } )
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


////////////////////////// resource delete //////////////////////////

router.delete('/tasks/:id', async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(400).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send()
    }
})



module.exports = router