const express= require('express');
const CourseModel= require('../Models/CourseModel');


const allCourses=async(req,res)=>{
    try {
        const courses = await CourseModel.find({});
        res.status(200).json({courses});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports=allCourses;