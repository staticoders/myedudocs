const userModel = require('../Models/UserModel');
const colors = require('colors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

// Login Controller
const loginController = async (req, res) => {
    // try {
    //     const { email, password } = req.body;
    //     const user = await userModel.findOne({ email: email, password: password });
    //     console.log(user);
        
    //     if (!user) {
    //        return res.status(404).send({ message: "Login Unsuccessfull"});
    //     }
    //     res.status(200).json({ message: "Login Successfull", user: user });
       
    // }
    // catch (err) {
    //     res.status(400).json({ message: "Error Occured" });
    // }


    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
    
        if (!user) {
            return res.status(404).send({ message: "Login Unsuccessful" });
        }
    
        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, "your-secret-key", { expiresIn: "1h" });
    
        // Send only necessary user data (excluding the password)
        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name, // assuming user has a name field
                token: token
            }
        });
    } catch (err) {
        res.status(400).json({ message: "Error Occurred" });
    }

}

// Register Controller
const registerController = async (req, res) => {
    // try {
    //     const newUser = new userModel(req.body);
    //     const user = await newUser.save();
    //     // JSON.stringify(user);
    //     res.status(201).json({ message: "User Registered Successfully", user: user });
    // } catch (error) {
    //     res.status(400).json({ message: "Error Occured" });
    // }

    try { 
        const { name, email, phn, password } = req.body;
    
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new userModel({
            name,
            email,
            phn, 
            password: hashedPassword
        });
    
        const user = await newUser.save();
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, "your-secret-key", { expiresIn: "1h" });
    
        // Return user data (excluding password)
        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phn: user.phn,
                token: token
            }
        });
    } catch (error) {
        res.status(400).json({ message: "Error Occurred", error: error.message });
    }
}

module.exports = { loginController, registerController };