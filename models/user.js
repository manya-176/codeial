const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
}, {
    //we want time created and updated to also be printed , thats how we do it
    timestamps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;