const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
////////////////////////// create routers //////////////////////////
const router = express.Router()


////////////////////////// resource creation //////////////////////////
router.post('/tasks',auth, async(req, res) => {
    //const task = Task(req.body)
    const task = Task({
        //copy all request body to current object (Task)
        ...req.body,
        //add owner
        owner: req.user._id
    })
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
//GET /tasks?completed=tru
//GET /tasks?limit=10&skip20
//GET /tasks?sortBy=createdAt:desc

router.get('/tasks',auth,(req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        // -1 desc and 1 asc
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        //const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
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

router.get('/tasks/:id',auth,(req,res)=>{
    const _id = req.params.id

    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
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

router.patch('/tasks/:id',auth, async (req,res)=>{

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
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        //const task = await Task.findById(req.params.id)
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } )
        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


////////////////////////// resource delete //////////////////////////

router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findByIdAndDelete({_id: req.params.id,owner:req.user._id})
        if(!task){
            return res.status(400).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send()
    }
})



module.exports = router