const TeacherModel = require('../Models/TeacherModel');
const colors = require('colors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
// Login Controller
const teacherloginController = async (req, res) => {
    // try {
    //     const { temail, tpassword } = req.body;
    //     const teacher = await TeacherModel.findOne({ temail: temail, tpassword: tpassword });
    //     if (!teacher) {
    //        return res.status(404).send({ message: "Login Unsuccessfull"});
    //     }
    //     res.status(200).json({ message: "Login Successfull", teacher: teacher });
    // }
    // catch (err) {
    //     res.status(400).json({ message: "Error Occured" });
    // }


    try {
        const { temail, tpassword } = req.body;
    
        // Find the teacher by email
        const teacher = await TeacherModel.findOne({ temail });
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
    
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(tpassword, teacher.tpassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    
        // Generate JWT token
        const token = jwt.sign(
            { teacherId: teacher._id, temail: teacher.temail },
            "your-secret-key",
            { expiresIn: "1h" }
        );
    
        // Return teacher data (excluding password)
        res.status(200).json({
            message: "Login Successful",
            teacher: {
                id: teacher._id,
                tname: teacher.tname,
                temail: teacher.temail,
                tphn: teacher.tphn,
                tspecialization: teacher.tspecialization,
                texp: teacher.texp,
                token: token
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error Occurred", error: err.message });
    }
}

// Register Controller
const teacherregisterController = async (req, res) => {
    // try {
    //     const newTeacher = new TeacherModel(req.body);
    //     const teacher = await newTeacher.save();
    //     res.status(201).json({ message: "Teacher Registered Successfully", teacher: teacher });
    // } catch (error) {
    //     res.status(400).json({ message: "Error Occured" });
    // }


    try { 
        const { tname, temail, tphn, tpassword, tspecialization, texp } = req.body;
    
        // Check if the teacher already exists
        const existingTeacher = await TeacherModel.findOne({ temail });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher already exists" });
        }
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(tpassword, 10);
    
        // Create a new teacher
        const newTeacher = new TeacherModel({
            tname,
            temail,
            tphn,
            tpassword: hashedPassword,
            tspecialization,
            texp
        });
    
        const teacher = await newTeacher.save();
    
        // Generate JWT token
        const token = jwt.sign(
            { teacherId: teacher._id, temail: teacher.temail },
            "your-secret-key",
            { expiresIn: "1h" }
        );
    
        // Return teacher data (excluding password)
        res.status(201).json({
            message: "Teacher Registered Successfully",
            teacher: {
                id: teacher._id,
                tname: teacher.tname,
                temail: teacher.temail,
                tphn: teacher.tphn,
                tspecialization: teacher.tspecialization,
                texp: teacher.texp,
                token: token
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error Occurred", error: error.message });
    }
    
}

module.exports = { teacherloginController, teacherregisterController };