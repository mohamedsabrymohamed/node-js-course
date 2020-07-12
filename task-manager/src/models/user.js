const mongoose = require('mongoose');
/////////////////////////////////validator/////////////////////////////////
const validator = require('validator')
/////////////////////////////////bcryptjs/////////////////////////////////
const bcrypt = require('bcryptjs')
/////////////////////////////////jsonwebtoken/////////////////////////////////
const jwt = require('jsonwebtoken')
/////////////////////////////////user model/////////////////////////////////

const Task = require('./task')
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
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},
//create timestamps
{
    timestamps: true
}
)



//virtual property not stored in database but refrence link between two table ( like foreign keys in database)
userSchema.virtual('tasks',{
    ref: 'Task',
    localField:'_id',
    foreignField:'owner'
})

//create generate user jwt token ( methods accepted on instance call)
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET)

    //save token to user table
    user.tokens = user.tokens.concat({ token: token })
    await user.save()

    return token
}

//user getPublicProfile to return only un-sensitive data without changing user model using toJSON function name

userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens 
    delete userObject.avatar
    return userObject
}

//create login function using schema ( statics accepted on model call)
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


//delete user tasks when user is removed
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id })
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