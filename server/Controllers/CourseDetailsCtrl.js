const express = require('express');
const CourseModel=require('../Models/CourseModel')

const CourseDetailsController = async (req, res) => {
    try {
        const courseId = req.params.id; 
        const Course = await CourseModel.findById(courseId)
        if (!Course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ Course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        console.log(error);
        
    }
}

module.exports = CourseDetailsController;