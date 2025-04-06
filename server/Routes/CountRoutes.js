const express=require('express');

const {UserCount,TeacherCount}=require('../Controllers/CountCtrl');

const router=express.Router();


//Fetch Students
router.get('/getAllStudents',UserCount);

//Fetch Teachers
router.get('/getAllTeachers',TeacherCount)

module.exports=router;