const express = require('express');
const { adminLoginController, adminRegisterController } = require('../Controllers/AdminCtrl');



const router = express.Router();





//POST || login
router.post('/adminLogin', adminLoginController);
//POST || register
router.post('/adminRegister', adminRegisterController);




module.exports = router;