import  { useEffect, useState } from 'react';
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom';

const TeacherProfile = () => {


  const Navigate = useNavigate();


  // Get user from local storage
  interface User {
    name?: string;
    aname?: string;
    tname?: string;
    temail?: string;
    tphn?: string;
    Status?: string;
    tspecialization:String;
    texp:String;
  }

  const [loginUser, setLoginuser] = useState<User>({})
  useEffect(() => {
    const user = localStorage.getItem('edudocs') ? JSON.parse(localStorage.getItem('edudocs') as string) : null
    if (user) {
      setLoginuser(user)
    }
  }, [])


  // Logout

  const logoutHandler = () => {
    localStorage.removeItem('edudocs')
    message.success("Logged out successfully", 7)
    Navigate('/admin-login')
  }


  // preventing admin to access dashboard if they are not looged in 
  useEffect(() => {
    if (!localStorage.getItem('edudocs')) {
      message.warning("You are not already logged in ! First Log in to your account", 7)
      Navigate('/admin-login')
    }
  }, [Navigate])



  //get user id from url



  // get Specificuser data from backend 
  const { id } = useParams()
  const [teacher, setTeacher] = useState<User>({})

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/teacherProfile/${id}`) // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setTeacher(data.teacher);
      })
      .catch((error) => {
        console.error("Error fetching Teacher:", error);
      });
  }, []);

  console.log(teacher);

  return (
    <>

      <div>
        {/* Begin page */}
        <div className="wrapper">
          {/* ========== Topbar Start ========== */}
          <div className="navbar-custom">
            <div className="topbar container-fluid">
              <div className="d-flex align-items-center gap-lg-2 gap-1">
                {/* Topbar Brand Logo */}
                <div className="logo-topbar">
                  {/* Logo light */}
                  <a href="index.html" className="logo-light">
                    <span className="logo-lg">
                      <img src="https://coderthemes.com/hyper/saas/assets/images/logo.png" alt="logo" />
                    </span>
                    <span className="logo-sm">
                      <img src="https://coderthemes.com/hyper/saas/assets/images/logo-sm.png" alt="small logo" />
                    </span>
                  </a>
                  {/* Logo Dark */}
                  <a href="index.html" className="logo-dark">
                    <span className="logo-lg">
                      <img src="https://coderthemes.com/hyper/saas/assets/images/logo-dark.png" alt="dark logo" />
                    </span>
                    <span className="logo-sm">
                      <img src="https://coderthemes.com/hyper/saas/assets/images/logo-dark-sm.png" alt="small logo" />
                    </span>
                  </a>
                </div>
                {/* Sidebar Menu Toggle Button */}
                <button className="button-toggle-menu">
                  <i className="fa-solid fa-bars-staggered"></i>
                </button>
                {/* Horizontal Menu Toggle Button */}
                <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                  <div className="lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </button>
                {/* Topbar Search Form */}
                <div className="app-search dropdown d-none d-lg-block">
                  <form>
                    <div className="input-group">
                      <input type="search" className="form-control dropdown-toggle" placeholder="Search..." id="top-search" />
                      {/* <span className="fa-solid fa-magnifying-glass" /> */}
                      <button className="input-group-text btn btn-primary" style={{ height: "fit-content" }} type="submit">Search</button>
                    </div>
                  </form>
                  <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                    {/* item*/}
                    <div className="dropdown-header noti-title">
                      <h5 className="text-overflow mb-2">Found <span className="text-danger">17</span> results</h5>
                    </div>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <i className="uil-notes font-16 me-1" />
                      <span>Analytics Report</span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <i className="uil-life-ring font-16 me-1" />
                      <span>How can I help you?</span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <i className="uil-cog font-16 me-1" />
                      <span>User profile settings</span>
                    </a>
                    {/* item*/}
                    <div className="dropdown-header noti-title">
                      <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                    </div>
                    <div className="notification-list">
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <div className="d-flex">
                          <img className="d-flex me-2 rounded-circle" src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height={32} />
                          <div className="w-100">
                            <h5 className="m-0 font-14">Erwin Brown</h5>
                            <span className="font-12 mb-0">UI Designer</span>
                          </div>
                        </div>
                      </a>
                      {/* item*/}
                      <a href="javascript:void(0);" className="dropdown-item notify-item">
                        <div className="d-flex">
                          <img className="d-flex me-2 rounded-circle" src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height={32} />
                          <div className="w-100">
                            <h5 className="m-0 font-14">Jacob Deo</h5>
                            <span className="font-12 mb-0">Developer</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="topbar-menu d-flex align-items-center gap-3">
                <li className="dropdown d-lg-none">
                  <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <i className="ri-search-line font-22" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                    <form className="p-3">
                      <input type="search" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                    </form>
                  </div>
                </li>




                <li className="dropdown">
                  <a className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                    <span className="account-user-avatar">
                      <img src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg" alt="user-image" width={32} className="rounded-circle" />
                    </span>
                    <span className="d-lg-flex flex-column gap-1 d-none">
                      <h5 className="my-0">Welcome {loginUser.name || loginUser.aname || loginUser.tname}</h5>
                      {/* <h6 className="my-0 fw-normal">Founder</h6> */}
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                    {/* item*/}
                    <div className=" dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item">
                      <i className="fa-solid fa-user"></i> &nbsp;
                      <span>My Account</span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item">
                      <i className="fa-solid fa-gear"></i> &nbsp;
                      <span>Settings</span>
                    </a>
                    <a onClick={logoutHandler} href="javascript:void(0);" className="dropdown-item">
                      <i className="fa-solid fa-right-from-bracket"></i> &nbsp;
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* ========== Topbar End ========== */}
          {/* ========== Left Sidebar Start ========== */}
          <div className="leftside-menu">
            {/* Brand Logo Light */}
            <a href="index.html" className="logo logo-light">
              <span className="logo-lg">
                <img src="https://coderthemes.com/hyper/saas/assets/images/logo.png" alt="logo" />
              </span>
              <span className="logo-sm">
                <img src="assets/images/logo-sm.png" alt="small logo" />
              </span>
            </a>
            {/* Brand Logo Dark */}
            <a href="index.html" className="logo logo-dark">
              <span className="logo-lg">
                <img src="https://coderthemes.com/hyper/saas/assets/images/logo-dark.png" alt="dark logo" />
              </span>
              <span className="logo-sm">
                <img src="https://coderthemes.com/hyper/saas/assets/images/logo-dark-sm.png" alt="small logo" />
              </span>
            </a>
            {/* Sidebar Hover Menu Toggle Button */}
            <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
              <i className="ri-checkbox-blank-circle-line align-middle" />
            </div>
            {/* Full Sidebar Menu Close Button */}
            <div className="button-close-fullsidebar">
              <i className="ri-close-fill align-middle" />
            </div>
            {/* Sidebar */}
            <div className="h-100" id="leftside-menu-container" data-simplebar>
              {/* Leftbar User */}
              <div className="leftbar-user">
                <a href="pages-profile.html">
                  <img src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg" alt="user-image" height={42} className="rounded-circle shadow-sm" />
                  <span className="leftbar-user-name mt-2">Dominic Keller</span>
                </a>
              </div>
              {/*- Sidemenu */}
              <ul className="side-nav">
                {/* <li className="side-nav-title">Navigation</li> */}
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="sidebarDashboards" className="side-nav-link">
                    <i className="fa-solid fa-house-user"></i>

                    <span> Dashboard Overview </span>
                  </a>

                </li>


                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" className="side-nav-link">
                    <i className="bi bi-person-badge"></i>
                    <span> User Management </span>
                    {/*  */}
                  </a>
                  <div className="collapse" id="sidebarEcommerce">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-teachers">👨‍🏫 Manage Teachers</a>
                      </li>
                      <li>
                        <a href="/manage-students">🎓 Manage Students</a>
                      </li>
                      <li>
                        <a href="/manage-roles">🛡️ Role & Permission Management </a>
                      </li>
                      <li>
                        <a href="/manage-user-access">🔒 User Access Control</a>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" className="side-nav-link">
                    <i className="bi bi-people"></i>
                    <span> Course & Class Management </span>

                  </a>
                  <div className="collapse" id="sidebarEmail">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-courses">📚 Manage Courses</a>
                      </li>
                      <li>
                        <a href="/add-courses">➕ Manage Courses</a>
                      </li>
                      <li>
                        <a href="/assign-teachers">📝 Assign Teachers to Courses</a>
                      </li>
                      <li>
                        <a href="/review-course-content">📖 Review Course Content</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" className="side-nav-link">
                    <i className="bi bi-pencil-square"></i>
                    <span> Manage Exams </span>

                  </a>
                  <div className="collapse" id="sidebarProjects">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/create-exams">📝 Create & Schedule Exams</a>
                      </li>
                      <li>
                        <a href="/students-reports">📊 Exam Reports </a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" className="side-nav-link">
                    <i className="bi bi-broadcast"></i>
                    <span> Manage Live Sessions </span>

                  </a>
                  <div className="collapse" id="sidebarTasks">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/create-live-sessions">📅 Create New Live Sessions </a>
                      </li>
                      <li>
                        <a href="/assign-teachers-for-live-sessions">🎯 Assign Teachers</a>
                      </li>
                      {/* <li>
                        <a href="apps-tasks.html">📍 Select Course/Class</a>
                      </li>
                      <li>
                        <a href="apps-tasks.html">⏰ Set Date & Time</a>
                      </li> */}
                      <li>
                        <a href="/generate-meetings">🔗 Generate Meeting Links</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* <li className="side-nav-title"></li> */}


                {/* <li className="side-nav-title">Components</li> */}
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarBaseUI" aria-expanded="false" aria-controls="sidebarBaseUI" className="side-nav-link">
                    <i className="bi bi-person-check"></i>
                    <span>Manage Admissions</span>

                  </a>
                  <div className="collapse" id="sidebarBaseUI">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-all-admissions"> 📚 Manage all Admissions</a>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" className="side-nav-link">
                    <i className="bi bi-bell"></i>
                    <span> Jobs Notifications </span>

                  </a>
                  <div className="collapse" id="sidebarExtendedUI">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/post-job">📌 Post a Job</a>
                      </li>
                      <li>
                        <a href="/manage-jobs"> 📂 Manage All Jobs</a>
                      </li>
                      <li>
                        <a href="/add-job-categories">📌 Create Job Categories</a>
                      </li>
                      <li>
                        <a href="/create-job-subcategories">📌 Create Job Subcategories</a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarIcons" aria-expanded="false" aria-controls="sidebarIcons" className="side-nav-link">
                    <i className="bi bi-credit-card"></i>
                    <span> Manage Payments </span>

                  </a>
                  <div className="collapse" id="sidebarIcons">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/manage-all-payments">📂 All Payments</a>
                      </li>
                      <li>
                        <a href="/all-dues">📌 Dues</a>
                      </li>

                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarCharts" aria-expanded="false" aria-controls="sidebarCharts" className="side-nav-link">
                    <i className="bi bi-cart-check"></i>
                    <span> Manage All orders </span>

                  </a>
                  <div className="collapse" id="sidebarCharts">
                    <ul className="side-nav-second-level">
                      <li className="side-nav-item">
                        <a data-bs-toggle="collapse" href="" aria-expanded="false" aria-controls="sidebarApexCharts">
                          <span> 📚 All Course Purchased </span>
                        </a>
                      </li>
                      <li>
                        <a href="/total-ebooks">📘 Ebooks Purchases</a>
                      </li>
                      <li>
                        <a href="/total-pdfs">📄 PDFs Purchases</a>
                      </li>

                      <li>
                        <a href="/refunds/calcellation">🔄 Refund & Cancellation Requests</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="side-nav-item">
                  <a data-bs-toggle="collapse" href="#sidebarForms" aria-expanded="false" aria-controls="sidebarForms" className="side-nav-link">
                    <i className="bi bi-book-half"></i>
                    <span> Books / Pdfs </span>

                  </a>
                  <div className="collapse" id="sidebarForms">
                    <ul className="side-nav-second-level">
                      <li>
                        <a href="/uploads-ebooks">📤 Upload Ebooks</a>
                      </li>
                      <li>
                        <a href="/uploads-pdfs">📤 Upload Pdfs</a>
                      </li>
                      <li>
                        <a href="/uploads-dpps">📤 Upload Dpps</a>
                      </li>
                      <li>
                        <a href="/manage-ebooks">📚 Manage All Ebooks</a>
                      </li>
                      <li>
                        <a href="/manage-pdfs">📄 Manage All Pdfs</a>
                      </li>
                      <li>
                        <a href="/manage-dpps">📄 Manage All Dpps</a>
                      </li>
                    </ul>
                  </div>
                </li>

              </ul>
              {/*- End Sidemenu */}
              <div className="clearfix" />
            </div>
          </div>
          {/* ========== Left Sidebar End ========== */}
          {/* ============================================================== */}
          {/* Start Page Content Here */}
          {/* ============================================================== */}
          <div className="content-page">
            <div className="content">
              {/* Start Content*/}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">

                  </div>
                </div>


                {/* end row */}
              </div>
              {/* container */}
            </div>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <p className='userlogo'>{teacher.tname}</p>
                </div>
                <span className='d-flex justify-content-center'>Student Since :{new Date(teacher.updatedAt).toLocaleDateString()}</span>
                <div className="col-md-12">
                  <div className="card mt-3 shadow-sm">
                    <div className="card-body user-card">
                      <h5 className="card-title">Student Details</h5>
                      <p className="card-text"><b>Name:</b> {teacher.tname}</p>
                      <p className="card-text"><b>Email:</b> {teacher.temail}</p>
                      <p className="card-text"><b>Phone:</b> {teacher.tphn}</p>
                      <p className="card-text"><b>Specialization:</b> {teacher.tspecialization}</p>
                      <p className="card-text"><b>Total Experience:</b> {teacher.texp}</p>
                      <p className="card-text"><b>Created At:</b> {new Date(teacher.updatedAt).toLocaleDateString()}</p>
                      <p className="card-text"><b>Verification Status:</b> {teacher.Status}</p>
                      <p className="card-text"><b>Total Courses Enrolled In :</b> 5</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content */}
            {/* Footer Start */}
            <footer className="bg-secondary text-light pt-4">
              <div className="container text-center text-md-start p-3">
                <div className="row">
                  {/* About Section */}
                  <div className="col-md-4">
                    <h5 className="fw-bold text-light">About Us</h5>
                    <p className="small">We provide high-quality services and ensure customer satisfaction with innovative solutions.</p>
                  </div>
                  {/* Quick Links in a Single Line */}
                  <div className="col-md-4 text-center">
                    <h5 className="fw-bold text-light">Quick Links</h5>
                    <div className="d-flex justify-content-center gap-3">
                      <a href="/" className="text-decoration-none text-light">Home</a>
                      <a href="/about" className="text-decoration-none text-light">About</a>
                      <a href="/services" className="text-decoration-none text-light">Services</a>
                      <a href="/contact" className="text-decoration-none text-light">Contact</a>
                    </div>
                  </div>
                  {/* Social Media */}
                  <div className="col-md-4 text-center text-md-end">
                    <h5 className="fw-bold text-light">Follow Us</h5>
                    <a href="#" className="bg-primary btn btn-outline-light btn-sm me-2"><i className="bi bi-facebook" /></a>
                    <a href="#" className="btn btn-outline-light btn-sm me-2"><i className="bi bi-twitter" /></a>
                    <a href="#" className="bg-danger btn btn-outline-light btn-sm me-2"><i className="bi bi-instagram" /></a>
                    <a href="#" className="bg-primary btn btn-outline-light btn-sm"><i className="bi bi-linkedin" /></a>
                  </div>
                </div>
                <hr className="my-3 text-secondary" />
                {/* Copyright */}
                <div className="text-center pb-3 small">
                  <b> &copy; 2025 MyEdudocs. All Rights Reserved.</b>
                </div>
              </div>
            </footer>

            {/* end Footer */}
          </div>
          {/* ============================================================== */}
          {/* End Page content */}
          {/* ============================================================== */}
        </div>
        {/* END wrapper */}
        {/* Theme Settings */}

      </div>


    </>
  );
}

export default TeacherProfile;
