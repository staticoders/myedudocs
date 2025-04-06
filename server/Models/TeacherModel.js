const mongoose = require('mongoose');


//Scheema Designing
const TeacherSchema = new mongoose.Schema({
    tname: {
        type: String,
        required: [true, 'Please provide a name']
    },
    temail: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    tphn:{
        type: Number,
        required: [true, 'Please provide a phone number'],
        unique: true
    },
    tpassword: {
        type: String,
        required: [true, 'Please provide a password']
    },
    tspecialization: {
        type: String,
        required: [true, 'Please provide a Specialization']
    },
    texp: { 
        type: Number,
        required: [true, 'Please provide a Experience']
    },
    Status:{
        type:String,
        default:'Not Verified',
    }
},
    { timestamps: true }
);


//Exportiong USERMODEL
module.exports = mongoose.model('teachers', TeacherSchema);