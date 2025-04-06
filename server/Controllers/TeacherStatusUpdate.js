const express=require('express');

const TeacherModel=require('../Models/TeacherModel');

const updateTeacherStatus=async(req,res)=>{
       
    try {
        const {id}=req.params;
        const updateTeacherStatus=await TeacherModel.findByIdAndUpdate(
            id,
            {Status:"Verified"},
            {new:true}
        )
        if(!updateTeacherStatus){
            return res.status(404).json({message:'Teacher not found'});
        }
        res.status(200).json({message:'Teacher status updated successfully',data:updateTeacherStatus});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
        
    }
}

module.exports=updateTeacherStatus;