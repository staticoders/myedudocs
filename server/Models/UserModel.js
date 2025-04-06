const mongoose = require('mongoose');


//Scheema Designing
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    phn:{
        type: Number,
        required: [true, 'Please provide a phone number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    Status:{
        type:String,
        default:'Not Verified',
    }
},
    { timestamps: true }
);


//Exportiong USERMODEL
module.exports = mongoose.model('users', UserSchema);