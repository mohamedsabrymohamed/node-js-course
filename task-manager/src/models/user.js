const mongoose = require('mongoose');
/////////////////////////////////validator/////////////////////////////////
const validator = require('validator')
/////////////////////////////////bcryptjs/////////////////////////////////
const bcrypt = require('bcryptjs')
/////////////////////////////////user model/////////////////////////////////

//create user schema

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
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
})



//create login function using schema
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email: email})
    if(!user) {
        throw Error('Unable to login. User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw Error('Username or password is incorrect')
    }

    return user
}

//user mongoose middleware to hash password before save
userSchema.pre('save', async function(next){
    const user = this

    //check if user updating password
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    //to exit the function after finish
    next()
})

const User = mongoose.model('User', userSchema);

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