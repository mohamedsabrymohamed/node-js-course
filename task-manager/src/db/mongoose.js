//connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//user model
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const store = User({
//     name: 'Sabry',
//     age: 32
// })

// store.save().then((store) => {
//     console.log(store)
// }).catch((error) => {
//     console.log(error)
// })



//tasks model

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = Task({
    description: 'learn',
    completed: false
})


task.save().then((store) => {
    console.log(store)
}).catch((error) => {
    console.log(error)
})