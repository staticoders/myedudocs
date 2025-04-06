const mongoose = require('mongoose');


//Scheema Designing
const AdminSchema = new mongoose.Schema({
    aname: {
        type: String,
        required: [true, 'Please provide a name']
    },
    aemail: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    apassword: {
        type: String,
        required: [true, 'Please provide a password']
    }
},
    { timestamps: true }
);


//Exportiong USERMODEL
module.exports = mongoose.model('admins', AdminSchema);