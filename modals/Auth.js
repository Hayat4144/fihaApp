const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the Structure of the Modal 
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now 
    }
});

// Make the User Modal
const model = new mongoose.model('User', UserSchema);

// Export the modal
module.exports= model;
