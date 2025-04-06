const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors= require('colors');
const connectDB = require('./Config/ConnectDB');


dotenv.config();
const app = express();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());    

//user routes
app.use('/api/v1/users', require('./Routes/UserRoutes'));

// teacher routes
app.use('/api/v1/teachers', require('./Routes/TeachersRoutes'));

// admin routes
app.use('/api/v1/admin', require('./Routes/AdminRoutes'));


// Count Routes
app.use('/api/v1/count',require('./Routes/CountRoutes'));

// User Profile Routes
app.use('/api/v1/userProfile',require('./Routes/UserProfileRoutes'));

// delete student route
app.use('/api/v1/deleteStudent',require('./Routes/DeleteStudentRoutes'));

// update student status route
app.use('/api/v1/updateStudentStatus',require('./Routes/UpdateStudentStatus'));

//teacher profile route`
app.use('/api/v1/teacherProfile',require('./Routes/TeacherProfileRoutes'));


// delete teacher route
app.use('/api/v1/deleteTeacher',require('./Routes/DeleteTeacherRoutes'));

// update teacher status route
app.use('/api/v1/updateTeacherStatus',require('./Routes/UpdateTeacherStatusRoutes'));



//Connecting to DATABASE
connectDB();

//Assiging PORT
const PORT = process.env.PORT || 8080


//Listening PORT
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`.yellow.bold);
});