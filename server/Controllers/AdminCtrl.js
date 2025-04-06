const AdminSchema =require('../Models/AdminModel')
const colors = require('colors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Login Controller
const adminLoginController = async (req, res) => {
    try {
        const { aemail, apassword } = req.body;
    
        // Find the admin by email
        const admin = await AdminSchema.findOne({ aemail });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
    
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(apassword, admin.apassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    
        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin._id, aemail: admin.aemail },
            "your-secret-key",
            { expiresIn: "1h" }
        );
    
        // Return admin data (excluding password)
        res.status(200).json({
            message: "Login Successful",
            admin: {
                id: admin._id,
                aname: admin.aname,
                aemail: admin.aemail,
                token: token
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Error Occurred", error: err.message });
    }
}

// Register Controller
const adminRegisterController = async (req, res) => {
    try { 
        const { aname, aemail, apassword } = req.body;
    
        // Check if the admin already exists
        const existingAdmin = await AdminSchema.findOne({ aemail });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(apassword, 10);
    
        // Create a new admin
        const newAdmin = new AdminSchema({
            aname,
            aemail,
            apassword: hashedPassword
        });
    
        const admin = await newAdmin.save();
    
        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id, aemail: admin.aemail }, "your-secret-key", { expiresIn: "52h" });
    
        // Return admin data (excluding password)
        res.status(201).json({
            message: "Admin Registered Successfully",
            admin: {
                id: admin._id,
                aname: admin.aname,
                aemail: admin.aemail,
                token: token
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error Occurred", error: error.message });
    }
}

module.exports = { adminLoginController, adminRegisterController };