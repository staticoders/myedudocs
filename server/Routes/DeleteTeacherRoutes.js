const express=require('express');
const deleteTeacher=require('../Controllers/DeleteTeacher');

const router=express.Router();

// delete teacher route
router.delete('/:id',deleteTeacher);

module.exports=router;