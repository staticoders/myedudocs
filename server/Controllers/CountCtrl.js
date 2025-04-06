const express = require('express');
const UserModel = require('../Models/UserModel');
const TeacherModel = require('../Models/TeacherModel');

const UserCount = async (req, res) => {
    try {
        const Users = await UserModel.find();
        const userCount = Users.length;
        // userId=Users._id
        console.log(Users);
        res.status(201).json({ message: "Successfully Fetched" ,Users:Users || [],userCount});

    } catch (error) {
        res.status(500).json({ message: "Error Occurred", error: err.message });
    }
    
}

const TeacherCount=async(req,res)=>{
    try {
        const Teachers=await TeacherModel.find();
        const teacherCount = Teachers.length;
        res.status(201).json({ message: "Successfully Fetched",Teachers:Teachers || [],teacherCount,Teacherid:Teachers._id});
        console.log(Teachers);
    } catch (error) {
        res.status(500).json({ message: "Error Occurred", error: err.message });
    }
}

module.exports={UserCount,TeacherCount};