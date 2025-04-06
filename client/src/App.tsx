
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
// import { Navigate } from 'react-router-dom'
import HomeOne from "./components/homes/home";
import About from "./components/about";
import Courses from "./components/courses";
import CourseDetails from "./components/course-details";
import GridBlog from "./components/grid-blog";
import StandardBlog from "./components/standard-blog";
import BlogDetails from "./components/blog-details";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Login from "./components/login";
import Register from "./components/register";
import Instructors from "./components/instructors";
import Error from "./components/error";
import Contact from "./components/contact"; 
import DashboardMain from "./components/DASHBOARD";
import TeacherLoginIndex from './components/login/teacherLoginIndex'
import TeacherDashboard from "./components/DASHBOARD/TeacherDashboard";
import AdminRegisterIndex from "./components/register/adminRegisterIndex";
import AdminLoginIndex from "./components/login/adminLoginIndex";
import TeacherRegistrationIndex from "./components/register/teacherIndex";
import StudentDashboardIndex from "./components/DASHBOARD/StudentDashboardIndex";
import ManageTeacherIndex from "./components/DASHBOARD/ManageTeachersIndex";
import ManageStudentIndex from "./components/DASHBOARD/ManageStudentIndex";
import StudentProfileIndex from "./components/DASHBOARD/StudentProfileIndex";
import TeacherProfileIndex from "./components/DASHBOARD/TeacherProfileIndex";
import AddCourseIndex from "./components/DASHBOARD/AddCourseIndex";


const router = createBrowserRouter([
  { path: "/", element: <HomeOne /> },
  { path: "/admin-dashboard", element: <DashboardMain /> },
  { path: "/teacher-dashboard", element: <TeacherDashboard /> },
  { path: "/student-dashboard", element: <StudentDashboardIndex /> },
  { path: "/manage-teachers", element: <ManageTeacherIndex /> },
  { path: "/manage-students", element: <ManageStudentIndex /> },
  { path: "/userProfile/:id", element: <StudentProfileIndex /> },
  { path: "/teacherProfile/:id", element: <TeacherProfileIndex /> },
  { path: "/add-courses", element: <AddCourseIndex /> },
  { path: "/about", element: <About /> },
  { path: "/courses", element: <Courses /> },
  { path: "/course-details", element: <CourseDetails /> },
  { path: "/grid-blog", element: <GridBlog /> },
  { path: "/standard-blog", element: <StandardBlog /> },
  { path: "/blog-details", element: <BlogDetails /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/student-login", element: <Login /> },
  { path: "/student-register", element: <Register /> },
  { path: "/teacher-register", element: <TeacherRegistrationIndex /> },
  { path: "/teacher-login", element: <TeacherLoginIndex /> },
  { path: "/admin-register", element: <AdminRegisterIndex /> },
  { path: "/admin-login", element: <AdminLoginIndex/> },
  { path: "/instructors", element: <Instructors /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <Error /> },

]);

function App() {

  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}



export default App
