const TeacherModel = require('../Models/TeacherModel');
const colors = require('colors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Multer setup directly inside controller file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/Users/rickb/OneDrive/Desktop/EDUDOCS/client/public/uploads");
    },
    filename: (req, file, cb) => {
        const safeName = path.basename(file.originalname); // Ensures only the filename
        cb(null, safeName);
    }
});

const upload = multer({ storage });

// Login Controller
const teacherloginController = async (req, res) => {

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
                tcity: teacher.tcity,
                token: token
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error Occurred", error: err.message });
    }
}

// Register Controller
const teacherregisterController = async (req, res) => {
    try {
        const {
            tname,
            temail,
            tphn,
            tpassword,
            tspecialization,
            texp,
            tcity,
            tdesc
        } = req.body;

        const existingTeacher = await TeacherModel.findOne({ temail });
        if (existingTeacher) return res.status(400).json({ message: "Teacher already exists" });

        const hashedPassword = await bcrypt.hash(tpassword, 10);

        const newTeacher = new TeacherModel({
            tname,
            temail,
            tphn,
            tpassword: hashedPassword,
            tspecialization,
            texp,
            tcity,
            tdesc,
            tprofile: req.file ? `/uploads/${req.file.filename}` : ''
        });

        const teacher = await newTeacher.save();

        const token = jwt.sign(
            { teacherId: teacher._id, temail: teacher.temail },
            "your-secret-key",
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "Teacher Registered Successfully",
            teacher: {
                id: teacher._id,
                tname: teacher.tname,
                temail: teacher.temail,
                tphn: teacher.tphn,
                tspecialization: teacher.tspecialization,
                texp: teacher.texp,
                tdesc: teacher.tdesc,
                tcity: teacher.tcity,
                tprofile: teacher.tprofile,
                token
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error Occurred", error: error.message });
    }
};

module.exports = {
    teacherloginController, teacherregisterController,
    upload: upload.single("tprofile")
};