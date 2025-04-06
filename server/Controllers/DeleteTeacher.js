const express=require('express');

const TeacherModel=require('../Models/TeacherModel');


const deleteTeacher=async(req,res)=>{
    try{
        const {id}=req.params;
        const Teacher=await TeacherModel.findByIdAndDelete(id);
        if(!Teacher){
            return res.status(404).json({message:'Teacher not found'});
        }
        return res.status(200).json({message:'Teacher deleted successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:'Internal server error'});
    }
}

module.exports=deleteTeacher;