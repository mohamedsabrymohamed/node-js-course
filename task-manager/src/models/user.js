const mongoose = require('mongoose');
/////////////////////////////////validator/////////////////////////////////
const validator = require('validator')

/////////////////////////////////user model/////////////////////////////////
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw Error('Password must more secured')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw Error('Age must be a positive number');
            }
        }
    }
});

// const store = User({
//     name: 'Sabry',
//     age: 32
// });

// store
//     .save()
//     .then(store => {
//         console.log(store);
//     })
//     .catch(error => {
//         console.log(error);
//     });



    module.exports= User