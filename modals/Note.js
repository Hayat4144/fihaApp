const mongoose = require('mongoose');

// Get the Schema constructor
var Schema = mongoose.Schema;

const UserNotesSchema = new mongoose.Schema({
    // Connect to the User collection to fetch user specific notes
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    title:{
        type:String ,
        required:true,

    },
    Description:{
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default:Date.now 
    }
})

const Notes = new mongoose.model('Note', UserNotesSchema)
module.exports = Notes ;
