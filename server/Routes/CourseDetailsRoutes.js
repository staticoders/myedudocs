const express=require('express');

const router=express.Router();
const CourseDetailsController=require('../Controllers/CourseDetailsCtrl');


// course details
router.get(':/id',CourseDetailsController);

module.exports=router;