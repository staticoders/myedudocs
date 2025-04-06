const express=require('express');
const StudentStatusUpdate=require('../Controllers/StudentStatusUpdate');
const router=express.Router();


// update status of student
router.put('/:id',StudentStatusUpdate)

module.exports=router;