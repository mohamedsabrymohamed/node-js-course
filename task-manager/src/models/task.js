const mongoose = require('mongoose');
/////////////////////////////////validator/////////////////////////////////
const validator = require('validator')

/////////////////////////////////tasks model/////////////////////////////////
const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //refrence user model
        ref:'User'
    }
},
//create timestamps
{
    timestamps: true
})


const Task = mongoose.model('Task', taskSchema);

// const task = Task({
//     description: 'learn',
//     completed: false
// });

// task
//     .save()
//     .then(store => {
//         console.log(store);
//     })
//     .catch(error => {
//         console.log(error);
//     });


module.exports = Task