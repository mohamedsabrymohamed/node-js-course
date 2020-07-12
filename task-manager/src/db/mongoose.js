/////////////////////////////////tasks model/////////////////////////////////

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = Task({
    description: 'learn',
    completed: false
});

task
    .save()
    .then(store => {
        console.log(store);
    })
    .catch(error => {
        console.log(error);
    });