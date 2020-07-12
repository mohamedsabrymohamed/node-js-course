const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

//////////////////////////////////create middleware for maintainance mode////////////////////////////////
// app.user((req,res,next)=> {
//     res.status(503).send('Site is currently down. Check back soon!')
// })
//to make express accept json 
app.use(express.json)
//register routers
app.use(userRouter)
app.use(taskRouter)





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




