const mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

const ContactSchemea = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
     
    },
    zip:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true

    },
    mobile:{
        type:Number,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    }
})

const ContactModel = new mongoose.model('ContactDetails', ContactSchemea) 

module.exports = ContactModel