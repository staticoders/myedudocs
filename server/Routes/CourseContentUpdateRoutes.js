const express=require('express');
const UpdateCourseContent=require('../Controllers/UpdateCourseContentCtrl')

const router=express.Router();


router.put('/:id',UpdateCourseContent)

module.exports=router

