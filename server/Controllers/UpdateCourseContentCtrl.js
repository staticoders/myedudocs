const express=require('express');
const CourseContentModel=require('../Models/CourseConjtent')

const UpdateCourseContent=async(req,res)=>{ 
    try {
        const id = req.params.id; 
        const updateData = req.body; 

       
        const updateCourseContent = await CourseContentModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateCourseContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({ message: 'Content updated successfully', updateCourseContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports=UpdateCourseContent;