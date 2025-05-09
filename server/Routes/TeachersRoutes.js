const express = require('express');
const { teacherloginController, teacherregisterController,upload  } = require('../Controllers/TeachersCtrl');


const router = express.Router();





//POST || login
router.post('/teacherLogin', teacherloginController);
//POST || register
router.post('/teacherRegister',upload, teacherregisterController);




module.exports = router;