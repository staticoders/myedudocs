const express=require('express');

const UserModel=require('../Models/UserModel');


const deleteStudent=async(req,res)=>{
    try{
        const {id}=req.params;
        const student=await UserModel.findByIdAndDelete(id);
        if(!student){
            return res.status(404).json({message:'Student not found'});
        }
        return res.status(200).json({message:'Student deleted successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:'Internal server error'});
    }
}

module.exports=deleteStudent;