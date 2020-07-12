const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

////////////////////////// create routers //////////////////////////
const router = express.Router()

////////////////////////// avatar upload and save it in database as binary////////////////////////////////////

const upload = multer({
    //dest:'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        //cb is callback function
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})


router.post('/users/me/avatar',auth,upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req, res , next) =>{
    res.status(400).send({error:error.message})
})

////////////////////////// delete avatar//////////////////////////

router.delete('/users/me/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

////////////////////////// display avatar//////////////////////////

router.get('/users/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})

////////////////////////// resource creation  (signup)//////////////////////////

router.post('/users', async (req, res) => {
    const user = User(req.body)
    try{
        await user.save()
        //generate token
        const token = await user.generateAuthToken()
        res.status(201).send({ user , token})
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


////////////////////////// resource Reading //////////////////////////
////////////////////////// fetch all //////////////////////////
router.get('/users', auth, async (req,res)=>{
    
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


////////////////////////// get user profile //////////////////////////
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
})

////////////////////////// fetch by id //////////////////////////

// router.get('/users/:id',async (req,res)=>{
//     const _id = req.params.id

//     try{
//         const user = await User.findById(_id)
//              if(!user) {
//                     return res.status(400).send()
//                 }
//         res.status(201).send(user)
//     }catch(e){
//         res.status(500).send(error)
//     }

    // User.findById(_id).then((user)=>{
    //     if(!user) {
    //         return res.status(400).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
//})

////////////////////////// resource Update //////////////////////////

router.patch('/users/me',auth, async (req,res)=>{

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
        //to make password hashing before save work
        //const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } )
        // if(!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})


////////////////////////// resource delete //////////////////////////

router.delete('/users/me',auth, async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(400).send()
        // }

        //remove current user
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})



//////////////////////////signin//////////////////////////

router.post('/users/login', async (req,res)=> {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user , token })
    }catch(e){
        res.status(400).send()
    }
})


//////////////////////////logout specified session//////////////////////////

router.post('users/logout',auth,async (req,res)=>{
    try{
        //check if token used is in tokens array in users table and delete it
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        //save user tokens 
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})


//////////////////////////logout all sessions//////////////////////////

router.post('users/logoutAll',auth,async (req,res)=>{
    try{
       
        req.user.tokens = []
        //save user tokens 
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})



module.exports = router