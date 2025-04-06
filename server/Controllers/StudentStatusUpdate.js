const express=require('express');

const UserModel=require('../Models/UserModel');

const updateStatus=async(req,res)=>{
       
    try {
        const {id}=req.params;
        const updateUserStatus=await UserModel.findByIdAndUpdate(
            id,
            {Status:"Verified"},
            {new:true}
        )
        if(!updateUserStatus){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User status updated successfully',data:updateUserStatus});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
        
    }
}

module.exports=updateStatus;