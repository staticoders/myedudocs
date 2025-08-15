
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
import ManageCoursesIndex from "./components/DASHBOARD/ManageCoursesIndex";
import SpecificCourseDetails from "./components/DASHBOARD/SpecificCourseDetailsIndex";
import UpdateCourseIndex from "./components/DASHBOARD/UpdateCoursesIndex";
import TeacherOwnProfileIndex from "./components/DASHBOARD/TeacherOwnProfileIndex";
import EditTeacherProfileIndex from "./components/DASHBOARD/EditTeacherProfileIndex";
import PublishCourseContentIndex from "./components/DASHBOARD/PublishCourseContentIndex";
import ManageCourseContentIndex from "./components/DASHBOARD/ManageCourseContentIndex";
import CourseContentDetailsIndex from "./components/DASHBOARD/CourseContentDetailsIndex";
import UpdateCourseContentIndex from "./components/DASHBOARD/UpdateCourseContentIndex";
import CreateAssignmmentIndex from "./components/DASHBOARD/CreateAssignmentIndex";
import ManageAssignmentIndex from "./components/DASHBOARD/ManageAssignmmentsIndex";
import UploadAssignmentIndex from "./components/DASHBOARD/UploadAssignmentIndex";
import ExamCreation from "./components/DASHBOARD/ExamCreation";
import ExamManagementIndex from "./components/DASHBOARD/ExamManagementIndex";
import JobsList from "./components/DASHBOARD/JobListings";
import JobCategories from "./components/DASHBOARD/JobsCategories";
import AddBooks from "./components/DASHBOARD/AddBooks";
import BookCateGoriesManager from "./components/DASHBOARD/AddBooksCategories";
import StudentExamList from "./components/DASHBOARD/studentExamsList";
import StudentOngoingExam from "./components/DASHBOARD/StudentOngoingExams";
import AddManageLiveSessions from "./components/DASHBOARD/Livesessions";
import StudentsLiveSessions from "./components/DASHBOARD/StudentsLiveSessions";

const router = createBrowserRouter([
  { path: "/", element: <HomeOne /> },
  { path: "/admin-dashboard", element: <DashboardMain /> },
  { path: "/teacher-dashboard", element: <TeacherDashboard /> },
  { path: "/student-dashboard", element: <StudentDashboardIndex /> },
  { path: "/manage-teachers", element: <ManageTeacherIndex /> },
  { path: "/manage-students", element: <ManageStudentIndex /> },
  { path: "/userProfile/:id", element: <StudentProfileIndex /> },
  { path: "/teacherProfile/:id", element: <TeacherProfileIndex /> },
  { path: "/teacher-dashboard/teacher/MyProfile/:id", element: <TeacherOwnProfileIndex /> },
  { path: "/add-courses", element: <AddCourseIndex /> },
  { path: "/exams", element: <ExamCreation /> },
  { path: "/manage-exams/:id", element: <ExamManagementIndex /> },
  { path: "/publish-course-content", element: <PublishCourseContentIndex /> },
  { path: "/manage-courses", element: <ManageCoursesIndex /> },
  { path: "/about", element: <About /> },
  { path: "/courses", element: <Courses /> },
  { path: "/jobs", element: <JobsList /> },
  { path: "/job-categories", element: <JobCategories /> },
  { path: "/books", element: <AddBooks /> },
  { path: "/book-categories", element: <BookCateGoriesManager /> },
  { path: "/course-details/:id", element: <CourseDetails /> },
  { path: "/teacher/edit-my-profile/:id", element: <EditTeacherProfileIndex /> },
  { path: "/CourseDetails/:id", element: < SpecificCourseDetails /> },
  { path: "/updateCourse-content/:id", element: < UpdateCourseContentIndex /> },
  { path: "/updateCourse/:id", element: <UpdateCourseIndex /> },
  { path: "/manage-courses-content", element: <ManageCourseContentIndex /> },
  { path: "/content-details/:id", element: <CourseContentDetailsIndex /> },
  { path: "/assignments", element: <CreateAssignmmentIndex /> },
  { path: "/manage-assignments/:teacherId", element: <ManageAssignmentIndex /> },
  { path: "/upload-assignment/:assignmentId", element: <UploadAssignmentIndex /> },
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
  { path: "/student/exams", element: <StudentExamList /> },
  { path: "/student/exams/ongoing/:examId", element: <StudentOngoingExam /> },
  { path: "/live-sessions", element: <AddManageLiveSessions /> },
  { path: "/students/live-sessions", element: <StudentsLiveSessions /> },
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
