const express=require('express');

const CourseModel=require('../Models/CourseModel');

const UpdateCourseApproval=async(req,res)=>{
       
    try {
        const {id}=req.params;
        const UpdateCourseApproval=await CourseModel.findByIdAndUpdate(
            id,
            {approved_by_admin:"Approved"},
            {new:true}
        )
        if(!UpdateCourseApproval){
            return res.status(404).json({message:'Course not found'});
        }
        res.status(200).json({message:'Course status updated successfully',data:UpdateCourseApproval});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
        
    }
}

module.exports=UpdateCourseApproval;