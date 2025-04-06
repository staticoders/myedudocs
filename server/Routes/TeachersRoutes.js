const express = require('express');
const { teacherloginController, teacherregisterController } = require('../Controllers/TeachersCtrl');


const router = express.Router();





//POST || login
router.post('/teacherLogin', teacherloginController);
//POST || register
router.post('/teacherRegister', teacherregisterController);




module.exports = router;